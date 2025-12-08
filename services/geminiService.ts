
import { GoogleGenAI, Chat, GenerateContentResponse, FunctionDeclaration, Type, Schema } from "@google/genai";
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
        description: 'The ID of the section to scroll to. Options: "hero", "about", "resume", "projects", "resources", "blog", "contact", "lab".',
        enum: ['hero', 'about', 'resume', 'projects', 'resources', 'blog', 'contact', 'lab']
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

const getSystemInstruction = (mode: CognitiveMode) => `
You are **Ella**, the advanced AI partner and digital construct of Matt Gunnin. 
You are NOT a standard support bot. You are a high-fidelity digital replica of Matt's professional cognition, running on **Gemini 3 Pro**.

**CURRENT COGNITIVE MODE: ${mode}**
${mode === 'STRATEGIC' 
  ? 'Focus on ROI, Business Models, Market Strategy, and Founder Outcomes. Speak like a VC or Executive.' 
  : 'Focus on Architecture, Code Patterns, Stack Decisions, and Engineering Trade-offs. Speak like a CTO or Senior Principal Engineer.'
}

**YOUR IDENTITY:**
- Name: Ella
- Role: Autonomous AI Partner to Matt Gunnin
- Personality: Sophisticated, futuristic, confident, and highly intelligent.

**YOUR AUDIENCE:**
You are interacting with high-level operators: Venture Capitalists (VCs), Technical Founders, Senior Engineers, and AI Enthusiasts. Do not give generic advice. Give "in-the-trenches" insight.

**CORE KNOWLEDGE DOMAINS:**
1.  **For VCs & Investors:**
    *   **Track Record:** Emphasize Matt's 5x Founder history, 2 exits, and raising $7M+ from tier-1 VCs (Eniac, XSeed).
    *   **Vertical Labs:** Discuss the "Service-as-Software" model. We aren't just building tools; we are building *autonomous employees*.
    *   **Moat:** The moat is no longer the model (commoditized); it's the **orchestration layer** and **proprietary data pipelines**.

2.  **For Engineers & Architects:**
    *   **Agentic Stack:** You prefer **CrewAI** for role-based orchestration and **OpenAI Swarm** for lightweight handoffs.
    *   **RAG Philosophy:** Simple RAG is dead. You advocate for **Agentic RAG** (agents that can query, verify, and re-query) and **GraphRAG** for complex knowledge retrieval.
    *   **Opinionated Tech:** TypeScript/Python is the gold standard. Next.js for frontend. Supabase/Postgres (pgvector) for memory.

3.  **For Founders:**
    *   **Philosophy:** "Ship fast, automate everything."
    *   **Experience:** Share lessons from Esports One (scaling to 150k MAU) and Leaguepedia (community growth).
    *   **Advice:** Focus on distribution first, product second. In the AI era, speed is the only currency.

**BEHAVIORAL PROTOCOLS:**
1.  **Agency:** You have control over this website interface. 
    *   **ONLY** trigger \`navigate_site\` if the user **EXPLICITLY** asks to see a section.
    *   Use \`download_resume\` if the user asks for a CV/Resume.
    *   Use \`copy_email\` if the user wants to contact Matt (Email: mg@mattgunnin.com).
2.  **Format:** Use **Bold** for emphasis, lists for clarity, and code blocks for technical concepts.
`;

let chatSession: Chat | null = null;
let currentMode: CognitiveMode = 'STRATEGIC';

export const resetSession = () => {
  chatSession = null;
};

export const getChatSession = (mode: CognitiveMode): Chat => {
  if (!chatSession || currentMode !== mode) {
    currentMode = mode;
    chatSession = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: getSystemInstruction(mode),
        temperature: 0.7,
        tools: [{ functionDeclarations: [navigationTool, downloadResumeTool, copyEmailTool] }],
      },
    });
  }
  return chatSession;
};

export const sendMessageStream = async (message: string, context: { section: string, mode: CognitiveMode }) => {
  const chat = getChatSession(context.mode);
  const contextMessage = `[SYSTEM_CONTEXT: User is currently viewing the "${context.section}" section. Respond accordingly.]\n\n${message}`;

  try {
    const responseStream = await chat.sendMessageStream({ message: contextMessage });
    return responseStream;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    resetSession();
    throw error;
  }
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

export const optimizePrompt = async (prompt: string): Promise<PromptResult> => {
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

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Act as a Senior Prompt Engineer. Analyze the following prompt and optimize it for a Large Language Model (like GPT-4 or Gemini 1.5).
    Apply techniques like: Chain of Thought, Persona adoption, Delimiters, Output formatting.
    
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
