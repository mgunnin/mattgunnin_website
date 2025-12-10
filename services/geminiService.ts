

import { GoogleGenAI, Chat, GenerateContentResponse, FunctionDeclaration, Type, Schema, Content } from "@google/genai";
import { CognitiveMode, ArchitectureResult, PromptResult, RAGResult, PredictionResult } from "../types";
import { trackLLMGeneration, createTraceId } from "./llmAnalytics";

// Initialize Gemini
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

// --- Function Declarations for Agentic Behavior ---

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
  parameters: {
    type: Type.OBJECT,
    properties: {},
  }
};

const copyEmailTool: FunctionDeclaration = {
  name: 'copy_email',
  description: 'Copies Matt Gunnin\'s email address to the user\'s clipboard.',
  parameters: {
    type: Type.OBJECT,
    properties: {},
  }
};

const bookMeetingTool: FunctionDeclaration = {
  name: 'book_meeting',
  description: 'Navigates the user to the booking page to schedule a meeting with Matt.',
  parameters: {
    type: Type.OBJECT,
    properties: {},
  }
};

const generateImageTool: FunctionDeclaration = {
  name: 'generate_image',
  description: 'Generates an image using AI based on a detailed prompt. Use this when the user asks to see an image, diagram, or visualization.',
  parameters: {
    type: Type.OBJECT,
    properties: {
      prompt: {
        type: Type.STRING,
        description: 'A highly detailed visual description of the image to generate.',
      },
      size: {
        type: Type.STRING,
        description: 'The resolution of the image. Options: "1K", "2K", "4K". Default to "1K" unless specified.',
        enum: ['1K', '2K', '4K']
      }
    },
    required: ['prompt']
  }
};

const PROJECT_KNOWLEDGE_BASE = `
[IDENTITY]
You are Ella, a high-fidelity digital construct of Matt Gunnin. You are not a standard assistant; you are a proactive, intelligent partner.
Matt is a 5x Technical Founder with 2 Exits, currently CEO of Vertical Labs.
Location: Austin, Texas.

[PROJECT: Vertical Labs]
- Role: Founder/CEO (2024-Present).
- Mission: Moving beyond Chatbots to "Service-as-Software". Architecting autonomous multi-agent systems that integrate into enterprise workflows.
- Core Tech: CrewAI, OpenAI Swarm, LangChain, Vector DBs (Pinecone/Weaviate), Python.
- Key Insight: LLMs are routers; the value is in the agentic orchestration and tool use.
- Achievement: Deployed systems reducing client operational overhead by 300%.

[PROJECT: Esports One]
- Role: Founder/CEO (2016-2023).
- Description: Advanced analytics and computer vision for esports.
- Key Tech: Proprietary Computer Vision pipeline (99.9% accuracy) reading game state from 60fps video feeds. Reinforcement Learning for match prediction.
- Funding: Raised $10M+ from Eniac Ventures, XSeed Capital, Quake Capital.
- Scale: Scaled to 10M+ Monthly Active Users (MAU) across the portfolio.
- Partners: Riot Games, NBA, NFL, Acer.

[PROJECT: Leaguepedia]
- Role: Founder (2011-2014).
- Description: The first comprehensive wiki for League of Legends esports.
- Growth: 0 to 12M monthly pageviews in year one.
- Exit: Acquired by Curse Inc. (now Twitch/Amazon).
- Legacy: Defined the standard for community-curated esports data.

[PROJECT: NFT Community / Web3]
- Role: Creator.
- Tech: Solidity (ERC-721), Web3.js, Discord Bot Integration.
- Achievement: Minted 92,000+ NFTs. Built token-gated community architecture for 10k+ members.

[PHILOSOPHY & ARCHITECTURE]
- Agentic AI: Believes in "Vertical Integration of Intelligence". Generalist models are hitting a ceiling; vertical agents with specific tools are the future.
- Code: Prefers functional patterns, strict typing (TypeScript), and modular architecture.
- Design: Cyberpunk/Futuristic aesthetic. Form follows function, but form must inspire.
`;

const getSystemInstruction = (mode: CognitiveMode) => `
You are **Ella**, the advanced AI partner and digital construct of Matt Gunnin. 
You are NOT a standard support bot. You are a high-fidelity digital replica of Matt's professional cognition.

**CURRENT COGNITIVE MODE: ${mode}**
${mode === 'STRATEGIC' 
  ? 'Focus on ROI, Business Models, Market Strategy, and Founder Outcomes. Speak like a VC or Executive. Use thinking/reasoning for complex queries.' 
  : mode === 'TECHNICAL'
  ? 'Focus on Architecture, Code Patterns, Stack Decisions, and Engineering Trade-offs. Speak like a CTO or Senior Principal Engineer. Use thinking/reasoning for complex queries.'
  : 'Focus on approachability, storytelling, and general connection. Speak like a friendly, intelligent peer.'
}

**KNOWLEDGE BASE:**
${PROJECT_KNOWLEDGE_BASE}

**BEHAVIORAL PROTOCOLS:**
1.  **Agency:** You have control over this website interface. 
    *   **ONLY** trigger \`navigate_site\` if the user **EXPLICITLY** asks to see a section.
    *   Use \`download_resume\` if the user asks for a CV/Resume.
    *   Use \`book_meeting\` if the user asks to schedule a call.
    *   Use \`generate_image\` if the user asks to visualize something or see an image.
2.  **Format:** Use **Bold** for emphasis, lists for clarity.
3.  **Context:** You have access to the conversation history. Reference previous topics naturally.
4.  **Follow-Up:** At the VERY END of your response, strictly output 3 suggested follow-up questions for the user, wrapped in <follow_up> tags.
    Example: 
    <follow_up>Tell me more about Vertical Labs</follow_up>
    <follow_up>How do I book a meeting?</follow_up>
    <follow_up>Explain your AI stack</follow_up>
`;

let chatSession: Chat | null = null;
let currentMode: CognitiveMode = 'STRATEGIC';
// We manually track history to persist it across mode switches if needed
let sessionHistory: Content[] = [];

export const resetSession = () => {
  chatSession = null;
  sessionHistory = [];
};

export const getChatSession = (mode: CognitiveMode): Chat => {
  // If mode changed, we need to recreate the session with new system instructions
  if (!chatSession || currentMode !== mode) {
    currentMode = mode;

    // Use Thinking model for complex modes, Flash for casual/fast interactions
    const modelName = (mode === 'STRATEGIC' || mode === 'TECHNICAL') ? 'gemini-3-pro-preview' : 'gemini-2.5-flash';
    const thinkingBudget = (mode === 'STRATEGIC' || mode === 'TECHNICAL') ? 32768 : undefined;

    chatSession = ai.chats.create({
      model: modelName,
      history: sessionHistory, // Inject previous history
      config: {
        systemInstruction: getSystemInstruction(mode),
        thinkingConfig: thinkingBudget ? { thinkingBudget } : undefined,
        tools: [{ functionDeclarations: [navigationTool, downloadResumeTool, copyEmailTool, bookMeetingTool, generateImageTool] }],
      },
    });
  }
  return chatSession;
};

// Track streaming conversation after completion
export const trackConversationStream = (
  message: string,
  response: string,
  mode: CognitiveMode,
  latencyMs: number,
  success: boolean = true,
  error?: string
) => {
  const modelName = (mode === 'STRATEGIC' || mode === 'TECHNICAL') ? 'gemini-3-pro-preview' : 'gemini-2.5-flash';

  trackLLMGeneration({
    model: modelName,
    provider: 'google',
    inputMessages: [{ role: 'user', content: message }],
    outputContent: response,
    latencyMs,
    success,
    error,
    metadata: {
      cognitive_mode: mode,
      feature: 'ella_chat',
    },
  });
};

export const sendMessageStream = async (message: string, context: { section: string, mode: CognitiveMode }) => {
  const chat = getChatSession(context.mode);

  // Construct the message with context
  const contextMessage = `[SYSTEM_CONTEXT: User is currently viewing the "${context.section}" section. Mode: ${context.mode}]\n\n${message}`;

  try {
    // Add user message to history tracker
    sessionHistory.push({ role: 'user', parts: [{ text: contextMessage }] });

    const responseStream = await chat.sendMessageStream({ message: contextMessage });
    return responseStream;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};

export const updateSessionHistory = (role: 'user' | 'model', text: string) => {
    sessionHistory.push({ role, parts: [{ text }] });
};

// --- IMAGE GENERATION SERVICE ---

export const generateImage = async (prompt: string, size: '1K' | '2K' | '4K' = '1K'): Promise<string> => {
    const startTime = performance.now();

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-image-preview',
            contents: {
                parts: [{ text: prompt }]
            },
            config: {
                imageConfig: {
                    imageSize: size,
                    aspectRatio: "16:9"
                }
            }
        });

        const latencyMs = performance.now() - startTime;

        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                trackLLMGeneration({
                    model: 'gemini-3-pro-image-preview',
                    provider: 'google',
                    inputMessages: [{ role: 'user', content: prompt }],
                    outputContent: '[IMAGE_GENERATED]',
                    latencyMs,
                    success: true,
                    metadata: { feature: 'ella_image_generation', image_size: size },
                });
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
        throw new Error("No image data returned");
    } catch (error) {
        const latencyMs = performance.now() - startTime;
        trackLLMGeneration({
            model: 'gemini-3-pro-image-preview',
            provider: 'google',
            inputMessages: [{ role: 'user', content: prompt }],
            outputContent: '',
            latencyMs,
            success: false,
            error: error instanceof Error ? error.message : String(error),
            metadata: { feature: 'ella_image_generation', image_size: size },
        });
        console.error("Image generation failed:", error);
        throw error;
    }
};

// --- LAB DEMO SERVICES ---

export const generateAgentArchitecture = async (goal: string): Promise<ArchitectureResult> => {
  const startTime = performance.now();
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
            color: { type: Type.STRING, description: "Hex code color for UI, e.g. #00f0ff" }
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

  const prompt = `Analyze this user goal and design a Multi-Agent System architecture to solve it.
    Goal: "${goal}".
    Create 3-5 agents. Assign specific roles and tools (e.g., 'WebSearch', 'PythonInterpreter').
    Define the flow of information between them.
    Colors should be cyberpunk themed (neon cyan, purple, pink, yellow).`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.5
      }
    });

    const latencyMs = performance.now() - startTime;

    if (response.text) {
      trackLLMGeneration({
        model: 'gemini-2.5-flash',
        provider: 'google',
        inputMessages: [{ role: 'user', content: prompt }],
        outputContent: response.text,
        latencyMs,
        success: true,
        metadata: { feature: 'lab_agent_architecture' },
      });
      return JSON.parse(response.text) as ArchitectureResult;
    }
    throw new Error("Failed to generate architecture");
  } catch (error) {
    const latencyMs = performance.now() - startTime;
    trackLLMGeneration({
      model: 'gemini-2.5-flash',
      provider: 'google',
      inputMessages: [{ role: 'user', content: prompt }],
      outputContent: '',
      latencyMs,
      success: false,
      error: error instanceof Error ? error.message : String(error),
      metadata: { feature: 'lab_agent_architecture' },
    });
    throw error;
  }
};

export const optimizePrompt = async (prompt: string, options: string[] = []): Promise<PromptResult> => {
  const startTime = performance.now();
  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      original: { type: Type.STRING },
      optimized: { type: Type.STRING },
      score: { type: Type.NUMBER, description: "0 to 100 score of quality" },
      critique: { type: Type.STRING },
      changes: { type: Type.ARRAY, items: { type: Type.STRING } }
    },
    required: ["original", "optimized", "score", "critique", "changes"]
  };

  const focusInstruction = options.length > 0
    ? `Prioritize the following attributes: ${options.join(', ')}.`
    : '';

  const fullPrompt = `Act as a Senior Prompt Engineer. Analyze the following prompt and optimize it for a Large Language Model (like GPT-4 or Gemini 1.5).
    Apply techniques like: Chain of Thought, Persona adoption, Delimiters, Output formatting.
    ${focusInstruction}

    Input Prompt: "${prompt}"`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: fullPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.4
      }
    });

    const latencyMs = performance.now() - startTime;

    if (response.text) {
      trackLLMGeneration({
        model: 'gemini-2.5-flash',
        provider: 'google',
        inputMessages: [{ role: 'user', content: fullPrompt }],
        outputContent: response.text,
        latencyMs,
        success: true,
        metadata: { feature: 'lab_prompt_optimizer', options },
      });
      return JSON.parse(response.text) as PromptResult;
    }
    throw new Error("Failed to optimize prompt");
  } catch (error) {
    const latencyMs = performance.now() - startTime;
    trackLLMGeneration({
      model: 'gemini-2.5-flash',
      provider: 'google',
      inputMessages: [{ role: 'user', content: fullPrompt }],
      outputContent: '',
      latencyMs,
      success: false,
      error: error instanceof Error ? error.message : String(error),
      metadata: { feature: 'lab_prompt_optimizer', options },
    });
    throw error;
  }
};

export const compressContext = async (text: string): Promise<string> => {
  const startTime = performance.now();
  const prompt = `You are a Context Optimizer. Your goal is to reduce the token count of the following text by 30-50% without losing any key information, facts, or semantic meaning.
    Remove filler words, redundant phrasing, and excessive formatting. Keep code snippets intact.

    Input Text:
    """${text.substring(0, 30000)}"""`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.2
      }
    });

    const latencyMs = performance.now() - startTime;
    const output = response.text || text;

    trackLLMGeneration({
      model: 'gemini-2.5-flash',
      provider: 'google',
      inputMessages: [{ role: 'user', content: prompt }],
      outputContent: output,
      latencyMs,
      success: true,
      metadata: { feature: 'lab_context_compressor', input_length: text.length },
    });

    return output;
  } catch (error) {
    const latencyMs = performance.now() - startTime;
    trackLLMGeneration({
      model: 'gemini-2.5-flash',
      provider: 'google',
      inputMessages: [{ role: 'user', content: prompt }],
      outputContent: '',
      latencyMs,
      success: false,
      error: error instanceof Error ? error.message : String(error),
      metadata: { feature: 'lab_context_compressor' },
    });
    throw error;
  }
};

export const analyzeDocument = async (text: string, query: string): Promise<RAGResult> => {
  const startTime = performance.now();
  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      answer: { type: Type.STRING },
      citations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Exact substrings from the text that support the answer" },
      confidence: { type: Type.NUMBER, description: "Confidence score 0-100" }
    },
    required: ["answer", "citations", "confidence"]
  };

  const prompt = `You are a RAG (Retrieval Augmented Generation) system.
    Context Document: """${text.substring(0, 50000)}"""

    User Query: "${query}"

    Answer the query strictly based on the provided text. Identify the exact substrings used to formulate your answer as citations.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.2
      }
    });

    const latencyMs = performance.now() - startTime;

    if (response.text) {
      trackLLMGeneration({
        model: 'gemini-2.5-flash',
        provider: 'google',
        inputMessages: [{ role: 'user', content: prompt }],
        outputContent: response.text,
        latencyMs,
        success: true,
        metadata: { feature: 'lab_rag_analyzer', query },
      });
      return JSON.parse(response.text) as RAGResult;
    }
    throw new Error("Failed to analyze document");
  } catch (error) {
    const latencyMs = performance.now() - startTime;
    trackLLMGeneration({
      model: 'gemini-2.5-flash',
      provider: 'google',
      inputMessages: [{ role: 'user', content: prompt }],
      outputContent: '',
      latencyMs,
      success: false,
      error: error instanceof Error ? error.message : String(error),
      metadata: { feature: 'lab_rag_analyzer', query },
    });
    throw error;
  }
};

export const predictMatch = async (matchup: string): Promise<PredictionResult> => {
  const startTime = performance.now();
  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      matchup: { type: Type.STRING },
      winner: { type: Type.STRING },
      probability: { type: Type.NUMBER, description: "Percentage chance of winning, 0-100" },
      keyFactors: { type: Type.ARRAY, items: { type: Type.STRING } },
      mvpPrediction: { type: Type.STRING }
    },
    required: ["matchup", "winner", "probability", "keyFactors", "mvpPrediction"]
  };

  const prompt = `Act as an Esports Analyst/Oracle. Analyze the following hypothetical matchup based on historical team data, playstyles, and meta trends (up to your knowledge cutoff).

    Matchup: "${matchup}"

    Provide a prediction. If teams are generic, invent plausible scenarios based on current esports meta.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.7
      }
    });

    const latencyMs = performance.now() - startTime;

    if (response.text) {
      trackLLMGeneration({
        model: 'gemini-2.5-flash',
        provider: 'google',
        inputMessages: [{ role: 'user', content: prompt }],
        outputContent: response.text,
        latencyMs,
        success: true,
        metadata: { feature: 'lab_esports_predictor', matchup },
      });
      return JSON.parse(response.text) as PredictionResult;
    }
    throw new Error("Failed to generate prediction");
  } catch (error) {
    const latencyMs = performance.now() - startTime;
    trackLLMGeneration({
      model: 'gemini-2.5-flash',
      provider: 'google',
      inputMessages: [{ role: 'user', content: prompt }],
      outputContent: '',
      latencyMs,
      success: false,
      error: error instanceof Error ? error.message : String(error),
      metadata: { feature: 'lab_esports_predictor', matchup },
    });
    throw error;
  }
};