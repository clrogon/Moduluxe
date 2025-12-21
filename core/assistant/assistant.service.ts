
import { GoogleGenAI, Chat } from "@google/genai";
import { AppData, User } from '../../shared/types/index';

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

// Helper to filter and minify data for LLM Context window based on User Role
const filterAndSummarizeContext = (data: AppData, user: User) => {
    // SECURITY: Tenant Isolation
    // Tenants must ONLY see data explicitly linked to their User ID via Bookings/Contracts.
    if (user.type === 'Tenant') {
        const userBookings = data.bookings.filter(b => b.userId === user.id);
        const userBookingIds = new Set(userBookings.map(b => b.id));
        const userHouseIds = new Set(userBookings.map(b => b.houseId));

        const userContracts = data.contracts.filter(c => userBookingIds.has(c.bookingId));
        const userContractIds = new Set(userContracts.map(c => c.id));

        const userPayments = data.payments.filter(p => userContractIds.has(p.contractId));
        const userMaintenance = data.maintenanceRequests.filter(m => userHouseIds.has(m.houseId));
        const userHouses = data.houses.filter(h => userHouseIds.has(h.id));

        return {
            currentUser: { name: user.name, role: user.type, status: user.status },
            myHouses: userHouses.map(h => ({ address: h.address, type: h.type, rent: h.rent })),
            myContracts: userContracts.map(c => ({ id: c.id, startDate: c.startDate, endDate: c.endDate, status: c.status })),
            myPayments: userPayments.map(p => ({ amount: p.amount, status: p.status, dueDate: p.dueDate, paidDate: p.paidDate })),
            myMaintenanceRequests: userMaintenance.map(m => ({ description: m.description, status: m.status, reportedDate: m.reportedDate }))
        };
    }

    // Admin / Owner View (Full but summarized)
    // Exclude heavy/sensitive arrays like auditLog, documents (file URLs), and leads unless necessary.
    return {
        currentUser: { name: user.name, role: user.type },
        houses: data.houses.map(h => ({ id: h.id, type: h.type, address: h.address, status: h.status, rent: h.rent })),
        users: data.users.map(u => ({ id: u.id, name: u.name, type: u.type, status: u.status })),
        contracts: data.contracts.map(c => ({ id: c.id, house: c.houseName, tenant: c.userName, status: c.status, end: c.endDate })),
        payments: data.payments.map(p => ({ amount: p.amount, status: p.status, due: p.dueDate })),
        maintenance: data.maintenanceRequests.map(m => ({ issue: m.description, status: m.status, priority: m.priority })),
        // Explicitly excluding: auditLog, settings, automations to minimize data exposure risk.
        // Including leads for business context
        leads: data.leads?.map(l => ({ name: l.name, status: l.status, interest: l.interest }))
    };
};

export const createChatSession = (context: AppData, user: User): Chat | null => {
  // SECURITY WARNING: In a production environment, never expose API keys in client-side code.
  // The API Key is injected via Vite define/process.env.
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
      console.warn("Moduluxe AI: API_KEY is missing in environment variables. AI features will be disabled.");
      return null;
  }

  try {
      const ai = new GoogleGenAI({ apiKey: apiKey });
      const model = 'gemini-2.5-flash';
      
      // SECURITY: Context Filtering
      // We filter the data BEFORE converting to string for the system prompt.
      const secureContext = filterAndSummarizeContext(context, user);

      const systemInstruction = `
        You are an expert real estate management assistant for a platform called Moduluxe.
        Your task is to answer questions based ONLY on the JSON data provided below.
        
        Guidelines:
        1. Do not make up information. If the answer cannot be found in the data, say so.
        2. Be concise and clear.
        3. Current Date: ${new Date().toLocaleDateString()}
        4. You are speaking to a ${user.type}. Do not provide information that violates their access level.
        
        DATA:
        ${JSON.stringify(secureContext)}
      `;

      return ai.chats.create({
        model: model,
        config: {
          systemInstruction: systemInstruction,
        },
      });
  } catch (error) {
      console.error("Moduluxe AI: Failed to initialize GoogleGenAI client.", error);
      return null;
  }
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
