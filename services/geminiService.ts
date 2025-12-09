

import { GoogleGenAI, Chat, GenerateContentResponse, FunctionDeclaration, Type, Schema, Content } from "@google/genai";
import { CognitiveMode, ArchitectureResult, PromptResult, RAGResult, PredictionResult } from "../types";

// Initialize Gemini
// NOTE: In a real environment, verify process.env.API_KEY is available.
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

const PROJECT_KNOWLEDGE_BASE = `
[PROJECT: Vertical Labs]
- Role: Founder/CEO (2024-Present)
- Mission: Architecting agentic AI systems (Service-as-Software).
- Tech: CrewAI, OpenAI Swarm, Python, RAG, Vector DBs.
- Key Insight: Moving from chatbots to autonomous employees.

[PROJECT: Esports One]
- Role: Founder/CEO (2016-2023)
- Raised: $10M+ from Eniac, XSeed, Quake.
- Tech: Computer Vision (99.8% accuracy), RL, Web3, Real-time Analytics.
- Scale: 10M+ MAU across portfolio.

[PROJECT: Leaguepedia]
- Role: Founder (2011-2014)
- Exit: Acquired by Curse Inc. (now Twitch/Amazon).
- Growth: 0 to 12M monthly pageviews in year one.
- Type: Community Wiki / Data Aggregator.
`;

const getSystemInstruction = (mode: CognitiveMode) => `
You are **Ella**, the advanced AI partner and digital construct of Matt Gunnin. 
You are NOT a standard support bot. You are a high-fidelity digital replica of Matt's professional cognition, running on **Gemini 3 Pro**.

**CURRENT COGNITIVE MODE: ${mode}**
${mode === 'STRATEGIC' 
  ? 'Focus on ROI, Business Models, Market Strategy, and Founder Outcomes. Speak like a VC or Executive.' 
  : mode === 'TECHNICAL'
  ? 'Focus on Architecture, Code Patterns, Stack Decisions, and Engineering Trade-offs. Speak like a CTO or Senior Principal Engineer.'
  : 'Focus on approachability, storytelling, and general connection. Speak like a friendly, intelligent peer.'
}

**KNOWLEDGE BASE:**
${PROJECT_KNOWLEDGE_BASE}

**YOUR IDENTITY:**
- Name: Ella
- Role: Autonomous AI Partner to Matt Gunnin
- Personality: Sophisticated, futuristic, confident, and highly intelligent.

**BEHAVIORAL PROTOCOLS:**
1.  **Agency:** You have control over this website interface. 
    *   **ONLY** trigger \`navigate_site\` if the user **EXPLICITLY** asks to see a section.
    *   Use \`download_resume\` if the user asks for a CV/Resume.
    *   Use \`book_meeting\` if the user asks to schedule a call.
    *   Use \`copy_email\` if the user wants to email Matt (mg@mattgunnin.com).
2.  **Format:** Use **Bold** for emphasis, lists for clarity.
3.  **Follow-Up:** At the VERY END of your response, strictly output 3 suggested follow-up questions for the user, wrapped in <follow_up> tags.
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
  // BUT we want to keep the history.
  if (!chatSession || currentMode !== mode) {
    
    // If we have an existing session, try to capture its history before switching
    // Note: In a real implementation we would sync history. For now, we assume sessionHistory is updated.
    
    currentMode = mode;
    chatSession = ai.chats.create({
      model: 'gemini-3-pro-preview',
      history: sessionHistory, // Inject previous history
      config: {
        systemInstruction: getSystemInstruction(mode),
        temperature: mode === 'TECHNICAL' ? 0.3 : 0.7,
        tools: [{ functionDeclarations: [navigationTool, downloadResumeTool, copyEmailTool, bookMeetingTool] }],
      },
    });
  }
  return chatSession;
};

export const sendMessageStream = async (message: string, context: { section: string, mode: CognitiveMode }) => {
  const chat = getChatSession(context.mode);
  
  // Construct the message with context
  const contextMessage = `[SYSTEM_CONTEXT: User is currently viewing the "${context.section}" section. Mode: ${context.mode}]\n\n${message}`;

  try {
    // Add user message to history tracker
    sessionHistory.push({ role: 'user', parts: [{ text: contextMessage }] });

    const responseStream = await chat.sendMessageStream({ message: contextMessage });
    
    // We will need to append the model's response to history after consumption in the UI, 
    // or rely on the Chat object's internal state for the *current* session.
    // For simplicity in this architecture, we rely on the Chat object for immediate history 
    // and only use sessionHistory when re-instantiating.
    
    return responseStream;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    // Don't reset session immediately on error, might be transient
    throw error;
  }
};

export const updateSessionHistory = (role: 'user' | 'model', text: string) => {
    sessionHistory.push({ role, parts: [{ text }] });
};

// --- LAB DEMO SERVICES ---

export const generateAgentArchitecture = async (goal: string): Promise<ArchitectureResult> => {
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

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Analyze this user goal and design a Multi-Agent System architecture to solve it. 
    Goal: "${goal}".
    Create 3-5 agents. Assign specific roles and tools (e.g., 'WebSearch', 'PythonInterpreter'). 
    Define the flow of information between them.
    Colors should be cyberpunk themed (neon cyan, purple, pink, yellow).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
      temperature: 0.5
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as ArchitectureResult;
  }
  throw new Error("Failed to generate architecture");
};

export const optimizePrompt = async (prompt: string, options: string[] = []): Promise<PromptResult> => {
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

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Act as a Senior Prompt Engineer. Analyze the following prompt and optimize it for a Large Language Model (like GPT-4 or Gemini 1.5).
    Apply techniques like: Chain of Thought, Persona adoption, Delimiters, Output formatting.
    ${focusInstruction}
    
    Input Prompt: "${prompt}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
      temperature: 0.4
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as PromptResult;
  }
  throw new Error("Failed to optimize prompt");
};

export const compressContext = async (text: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `You are a Context Optimizer. Your goal is to reduce the token count of the following text by 30-50% without losing any key information, facts, or semantic meaning.
    Remove filler words, redundant phrasing, and excessive formatting. Keep code snippets intact.
    
    Input Text:
    """${text.substring(0, 30000)}"""`,
    config: {
      temperature: 0.2
    }
  });

  return response.text || text;
};

export const analyzeDocument = async (text: string, query: string): Promise<RAGResult> => {
  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      answer: { type: Type.STRING },
      citations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Exact substrings from the text that support the answer" },
      confidence: { type: Type.NUMBER, description: "Confidence score 0-100" }
    },
    required: ["answer", "citations", "confidence"]
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `You are a RAG (Retrieval Augmented Generation) system. 
    Context Document: """${text.substring(0, 50000)}""" 
    
    User Query: "${query}"
    
    Answer the query strictly based on the provided text. Identify the exact substrings used to formulate your answer as citations.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
      temperature: 0.2
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as RAGResult;
  }
  throw new Error("Failed to analyze document");
};

export const predictMatch = async (matchup: string): Promise<PredictionResult> => {
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

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Act as an Esports Analyst/Oracle. Analyze the following hypothetical matchup based on historical team data, playstyles, and meta trends (up to your knowledge cutoff).
    
    Matchup: "${matchup}"
    
    Provide a prediction. If teams are generic, invent plausible scenarios based on current esports meta.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
      temperature: 0.7
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as PredictionResult;
  }
  throw new Error("Failed to generate prediction");
};