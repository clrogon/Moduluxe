
import { GoogleGenAI, Chat } from "@google/genai";
import { AppData } from '../../shared/types/index';

// SECURITY: Rate Limiter Implementation
// Mitigates abuse since the API key is exposed client-side.
class TokenBucket {
    private capacity: number;
    private tokens: number;
    private lastRefill: number;
    private refillRate: number; // tokens per millisecond

    constructor(capacity: number, refillRatePerSecond: number) {
        this.capacity = capacity;
        this.tokens = capacity;
        this.lastRefill = Date.now();
        this.refillRate = refillRatePerSecond / 1000;
    }

    tryConsume(tokensToConsume: number = 1): boolean {
        this.refill();
        if (this.tokens >= tokensToConsume) {
            this.tokens -= tokensToConsume;
            return true;
        }
        return false;
    }

    private refill() {
        const now = Date.now();
        const delta = now - this.lastRefill;
        const tokensToAdd = delta * this.refillRate;
        this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
        this.lastRefill = now;
    }
}

// 1 request every 3 seconds, burst of 2
const rateLimiter = new TokenBucket(2, 0.33);

// Helper to minify data for LLM Context window
const summarizeContext = (data: AppData) => {
    return {
        houses: data.houses.map(h => ({ id: h.id, type: h.type, address: h.address, status: h.status, rent: h.rent })),
        users: data.users.map(u => ({ id: u.id, name: u.name, type: u.type, status: u.status })),
        contracts: data.contracts.map(c => ({ id: c.id, house: c.houseName, tenant: c.userName, status: c.status, end: c.endDate })),
        payments: data.payments.map(p => ({ amount: p.amount, status: p.status, due: p.dueDate })),
        maintenance: data.maintenanceRequests.map(m => ({ issue: m.description, status: m.status, priority: m.priority })),
        // Exclude logs, settings, and other heavy objects
    };
};

export const createChatSession = (context: AppData): Chat => {
  // SECURITY WARNING: In a production environment, never expose API keys in client-side code.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-2.5-flash';
  
  // Performance Optimization: Send minified context
  const minifiedContext = summarizeContext(context);

  const systemInstruction = `
    You are an expert real estate management assistant for a platform called Moduluxe.
    Your task is to answer questions based ONLY on the JSON data provided below.
    
    Guidelines:
    1. Do not make up information. If the answer cannot be found in the data, say so.
    2. Be concise and clear.
    3. Current Date: ${new Date().toLocaleDateString()}
    
    DATA:
    ${JSON.stringify(minifiedContext)}
  `;

  return ai.chats.create({
    model: model,
    config: {
      systemInstruction: systemInstruction,
    },
  });
};

export const sendMessageToChat = async (chat: Chat, message: string): Promise<string> => {
  // Enforce Rate Limit
  if (!rateLimiter.tryConsume()) {
      return "I'm receiving too many requests. Please wait a moment before asking again.";
  }

  try {
    const response = await chat.sendMessage({ message });
    return response.text ?? "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "An error occurred while communicating with the AI Assistant. Please check the console for details.";
  }
};
