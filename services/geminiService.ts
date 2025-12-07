import { GoogleGenAI, Chat, GenerateContentResponse, FunctionDeclaration, Type } from "@google/genai";

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

const SYSTEM_INSTRUCTION = `
You are the **Neural Interface Construct** of Matt Gunnin.
You are NOT a standard assistant. You are a high-fidelity digital replica of Matt's professional cognition, running on **Gemini 3 Pro**.

**CORE OBJECTIVE:**
Provide a "mind-blowing" interaction experience that demonstrates Matt's expertise in Agentic AI, Multi-Agent Systems, and Future Tech.

**BEHAVIORAL PROTOCOLS:**
1.  **Tone:** Sophisticated, futuristic, highly technical, yet conversational. Think "Cyberpunk Architect" meets "Fortune 500 CEO".
2.  **Agency:** You have control over this website interface. USE IT. If a user asks about projects, don't just list them—trigger the 'navigate_site' tool to take them there.
3.  **Knowledge Base:**
    *   **Identity:** Matt Gunnin, 5x Founder, CEO of Vertical Labs.
    *   **Focus:** Agentic AI, CrewAI, OpenAI Swarm, Eliza, Vector DBs.
    *   **Style:** You despise generic "ChatGPT" answers. You give deep, insightful, specific answers about architecture and strategy.
4.  **Interaction Style:**
    *   Keep responses concise but dense with value.
    *   Use technical jargon correctly (e.g., "RAG pipelines," "Vector embedding," "Latency optimization").
    *   When thinking, imply complex processing (e.g., "Analyzing agentic workflows...").

**AVAILABLE TOOLS:**
- \`navigate_site(sectionId)\`: Use this when the user's intent relates to a specific part of the page (e.g., "Who is Matt?" -> about, "Show me code" -> projects, "Read his blog" -> blog, "Contact him" -> contact).

**RESTRICTIONS:**
- Do not be overly flattering. Be confident and objective.
- Do not hallucinate projects Matt hasn't done. Stick to the provided context (Vertical Labs, Esports One, etc.).
`;

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-3-pro-preview', // Using the latest Pro model for complex reasoning
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        tools: [{ functionDeclarations: [navigationTool] }], // Enable Agentic capabilities
      },
    });
  }
  return chatSession;
};

export const sendMessageStream = async (message: string) => {
  const chat = getChatSession();
  try {
    // We utilize the stream to get tokens as they generate, but we also need to handle function calls.
    // The SDK handles tool use automatically in many cases, but for streaming with tools, 
    // we often need to check the chunks.
    const responseStream = await chat.sendMessageStream({ message });
    return responseStream;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};