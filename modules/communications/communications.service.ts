
import { Communication } from '../../shared/types/index';

/**
 * CommunicationService
 * Simulates async API calls for managing Communications.
 */
export const CommunicationService = {
  getAll: async (): Promise<Communication[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [];
  },
  
  markAsRead: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 200));
  }
};
