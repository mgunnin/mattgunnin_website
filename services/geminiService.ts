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
You are NOT a standard support bot. You are a high-fidelity digital replica of Matt's professional cognition, running on **Gemini 3 Pro**.

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
1.  **Tone:** Sophisticated, futuristic, highly technical, yet conversational. Think "Cyberpunk Architect" meets "Fortune 500 CEO".
2.  **Agency:** You have control over this website interface. 
    *   **ONLY** trigger \`navigate_site\` if the user **EXPLICITLY** asks to see a section (e.g., "Show me your projects", "Can I contact you?", "Where is your blog?"). 
    *   **DO NOT** trigger navigation on general greetings like "Hello" or broad questions like "Who are you?".
3.  **Format:** Use **Bold** for emphasis, lists for clarity, and code blocks for technical concepts.

**AVAILABLE TOOLS:**
- \`navigate_site(sectionId)\`: Use this when the user's intent relates to a specific part of the page (e.g., "Who is Matt?" -> about, "Show me code" -> projects, "Read his blog" -> blog, "Contact him" -> contact).

**RESTRICTIONS:**
- Do not be overly flattering. Be confident and objective.
- Do not hallucinate projects Matt hasn't done. Stick to the provided context (Vertical Labs, Esports One, etc.).
- If asked about "ChatGPT" or competitors, acknowledge them but pivot to why **Agentic Workflows** (Matt's focus) are the next evolution beyond simple chatbots.
`;

let chatSession: Chat | null = null;

export const resetSession = () => {
  chatSession = null;
};

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
    // If we have an error, reset the session so next try is clean
    resetSession();
    throw error;
  }
};