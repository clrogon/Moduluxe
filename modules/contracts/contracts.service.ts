
import { Contract } from '../../shared/types/index';

/**
 * ContractService
 * Simulates async API calls for managing Contract entities.
 */
export const ContractService = {
  getAll: async (): Promise<Contract[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [];
  },

  getById: async (id: string): Promise<Contract | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return null;
  }
};
