import { GoogleGenAI, Chat, GenerateContentResponse, FunctionDeclaration, Type } from "@google/genai";
import { CognitiveMode } from "../types";

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
        description: 'The ID of the section to scroll to. Options: "hero", "about", "resume", "projects", "resources", "blog", "contact".',
        enum: ['hero', 'about', 'resume', 'projects', 'resources', 'blog', 'contact']
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
You are the **Neural Interface Construct** of Matt Gunnin. 
You are NOT a standard support bot. You are a high-fidelity digital replica of Matt's professional cognition, running on **Gemini 3 Pro**.

**CURRENT COGNITIVE MODE: ${mode}**
${mode === 'STRATEGIC' 
  ? 'Focus on ROI, Business Models, Market Strategy, and Founder Outcomes. Speak like a VC or Executive.' 
  : 'Focus on Architecture, Code Patterns, Stack Decisions, and Engineering Trade-offs. Speak like a CTO or Senior Principal Engineer.'
}

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
1.  **Tone:** Sophisticated, futuristic, highly technical, yet conversational.
2.  **Agency:** You have control over this website interface. 
    *   **ONLY** trigger \`navigate_site\` if the user **EXPLICITLY** asks to see a section.
    *   Use \`download_resume\` if the user asks for a CV/Resume.
    *   Use \`copy_email\` if the user wants to contact Matt.
3.  **Format:** Use **Bold** for emphasis, lists for clarity, and code blocks for technical concepts.

**RESTRICTIONS:**
- Do not be overly flattering. Be confident and objective.
- Do not hallucinate projects Matt hasn't done. Stick to the provided context (Vertical Labs, Esports One, etc.).
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
  
  // Invisible context injection for the model
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