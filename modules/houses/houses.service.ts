
import { House } from '../../shared/types/index';

/**
 * HouseService
 * Simulates async API calls for managing House entities.
 */
export const HouseService = {
  getAll: async (): Promise<House[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // In a real app, this would fetch from /api/houses
    return []; 
  },

  create: async (house: House): Promise<House> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return house;
  },

  update: async (house: House): Promise<House> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return house;
  },

  delete: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
  }
};
