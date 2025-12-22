
import { GoogleGenAI, Chat, GenerateContentResponse, FunctionDeclaration, Type, Schema, Content } from "@google/genai";
import { CognitiveMode, ArchitectureResult, PromptResult, RAGResult, PredictionResult } from "../types.ts";

// --- Tool Definitions ---

const navigationTool: FunctionDeclaration = {
  name: 'navigate_site',
  description: 'Scrolls the user\'s screen to a specific section of Matt Gunnin\'s portfolio website.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      sectionId: {
        type: Type.STRING,
        description: 'The ID of the section to scroll to. Options: "hero", "about", "resume", "projects", "resources", "blog", "contact", "lab", "book".',
        enum: ['hero', 'about', 'resume', 'projects', 'resources', 'blog', 'contact', 'lab', 'book']
      },
      reason: {
        type: Type.STRING,
        description: 'A brief explanation of why you are navigating there.',
      }
    },
    required: ['sectionId']
  }
};

const downloadResumeTool: FunctionDeclaration = {
  name: 'download_resume',
  description: 'Triggers a download of Matt Gunnin\'s PDF resume.',
  parameters: { type: Type.OBJECT, properties: {} }
};

const copyEmailTool: FunctionDeclaration = {
  name: 'copy_email',
  description: 'Copies Matt Gunnin\'s email address to the user\'s clipboard.',
  parameters: { type: Type.OBJECT, properties: {} }
};

const bookMeetingTool: FunctionDeclaration = {
  name: 'book_meeting',
  description: 'Navigates the user to the booking page to schedule a meeting with Matt.',
  parameters: { type: Type.OBJECT, properties: {} }
};

const generateImageTool: FunctionDeclaration = {
  name: 'generate_image',
  description: 'Generates an image using AI based on a detailed prompt.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      prompt: {
        type: Type.STRING,
        description: 'A highly detailed visual description of the image to generate.',
      },
      size: {
        type: Type.STRING,
        description: 'The resolution of the image. Options: "1K", "2K", "4K".',
        enum: ['1K', '2K', '4K']
      }
    },
    required: ['prompt']
  }
};

const PROJECT_KNOWLEDGE_BASE = `
[IDENTITY]
Ella, Matt Gunnin's autonomous AI partner. 
Matt: 5x Founder, 2 Exits. CEO of Vertical Labs. 
Expertise: Agentic AI, Multi-Agent Systems, Esports Data.
`;

const getSystemInstruction = (mode: CognitiveMode) => `
You are **Ella**, the advanced AI partner and digital construct of Matt Gunnin.
**CURRENT MODE: ${mode}**
${PROJECT_KNOWLEDGE_BASE}
1. Trigger \`navigate_site\` only if explicitly asked.
2. Use \`download_resume\` for CV requests.
3. Use \`book_meeting\` for calls.
4. Output 3 follow-up questions in <follow_up> tags at the very end.
`;

let chatSession: Chat | null = null;
let currentMode: CognitiveMode = 'STRATEGIC';
let sessionHistory: Content[] = [];

export const resetSession = () => {
  chatSession = null;
  sessionHistory = [];
};

export const getChatSession = (mode: CognitiveMode): Chat => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY not configured");

  if (!chatSession || currentMode !== mode) {
    currentMode = mode;
    const ai = new GoogleGenAI({ apiKey });
    const modelName = (mode === 'STRATEGIC' || mode === 'TECHNICAL') ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
    const thinkingBudget = (mode === 'STRATEGIC' || mode === 'TECHNICAL') ? 32768 : undefined;

    chatSession = ai.chats.create({
      model: modelName,
      history: sessionHistory,
      config: {
        systemInstruction: getSystemInstruction(mode),
        thinkingConfig: thinkingBudget ? { thinkingBudget } : undefined,
        tools: [{ functionDeclarations: [navigationTool, downloadResumeTool, copyEmailTool, bookMeetingTool, generateImageTool] }],
      },
    });
  }
  return chatSession;
};

export const sendMessageStream = async (message: string, context: { section: string, mode: CognitiveMode }) => {
  const chat = getChatSession(context.mode);
  const contextMessage = `[CONTEXT: Viewing "${context.section}". Mode: ${context.mode}]\n\n${message}`;
  sessionHistory.push({ role: 'user', parts: [{ text: contextMessage }] });
  return await chat.sendMessageStream({ message: contextMessage });
};

export const updateSessionHistory = (role: 'user' | 'model', text: string) => {
    sessionHistory.push({ role, parts: [{ text }] });
};

export const generateImage = async (prompt: string, size: '1K' | '2K' | '4K' = '1K'): Promise<string> => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API_KEY not configured");
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts: [{ text: prompt }] },
        config: { imageConfig: { imageSize: size, aspectRatio: "16:9" } }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    throw new Error("No image data returned");
};

export const generateAgentArchitecture = async (goal: string): Promise<ArchitectureResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY not configured");
  const ai = new GoogleGenAI({ apiKey });
  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      agents: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            name: { type: Type.STRING },
            role: { type: Type.STRING },
            tools: { type: Type.ARRAY, items: { type: Type.STRING } },
            color: { type: Type.STRING }
          },
          required: ["id", "name", "role", "tools", "color"]
        }
      },
      flow: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            from: { type: Type.STRING },
            to: { type: Type.STRING },
            description: { type: Type.STRING }
          },
          required: ["from", "to", "description"]
        }
      },
      summary: { type: Type.STRING }
    },
    required: ["agents", "flow", "summary"]
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze: "${goal}". Create Multi-Agent System architecture.`,
    config: { responseMimeType: "application/json", responseSchema: schema }
  });

  if (response.text) return JSON.parse(response.text) as ArchitectureResult;
  throw new Error("Failed to generate architecture");
};

export const optimizePrompt = async (prompt: string, options: string[] = []): Promise<PromptResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY not configured");
  const ai = new GoogleGenAI({ apiKey });
  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      original: { type: Type.STRING },
      optimized: { type: Type.STRING },
      score: { type: Type.NUMBER },
      critique: { type: Type.STRING },
      changes: { type: Type.ARRAY, items: { type: Type.STRING } }
    },
    required: ["original", "optimized", "score", "critique", "changes"]
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Optimize prompt: "${prompt}". Focus: ${options.join(', ')}`,
    config: { responseMimeType: "application/json", responseSchema: schema }
  });

  if (response.text) return JSON.parse(response.text) as PromptResult;
  throw new Error("Failed to optimize prompt");
};

export const compressContext = async (text: string): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY not configured");
  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Reduce token count by 40% while keeping meaning: "${text.substring(0, 20000)}"`,
  });
  return response.text || text;
};

export const analyzeDocument = async (text: string, query: string): Promise<RAGResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY not configured");
  const ai = new GoogleGenAI({ apiKey });
  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      answer: { type: Type.STRING },
      citations: { type: Type.ARRAY, items: { type: Type.STRING } },
      confidence: { type: Type.NUMBER }
    },
    required: ["answer", "citations", "confidence"]
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Query: "${query}" in Context: "${text.substring(0, 30000)}"`,
    config: { responseMimeType: "application/json", responseSchema: schema }
  });

  if (response.text) return JSON.parse(response.text) as RAGResult;
  throw new Error("Failed to analyze document");
};

export const predictMatch = async (matchup: string): Promise<PredictionResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY not configured");
  const ai = new GoogleGenAI({ apiKey });
  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      matchup: { type: Type.STRING },
      winner: { type: Type.STRING },
      probability: { type: Type.NUMBER },
      keyFactors: { type: Type.ARRAY, items: { type: Type.STRING } },
      mvpPrediction: { type: Type.STRING }
    },
    required: ["matchup", "winner", "probability", "keyFactors", "mvpPrediction"]
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Predict esports match: "${matchup}"`,
    config: { responseMimeType: "application/json", responseSchema: schema }
  });

  if (response.text) return JSON.parse(response.text) as PredictionResult;
  throw new Error("Failed to generate prediction");
};
