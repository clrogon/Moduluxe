
import { House } from '../../shared/types/index';

/**
 * HouseService
 * Simulates async API calls for managing House entities.
 */
export const HouseService = {
  getAll: async (tenantId: string): Promise<House[]> => {
    if (!tenantId) {
      throw new Error('tenantId is required to fetch houses.');
    }

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    // In a real app, this would fetch from /api/houses
    // SECURITY WARNING: Any production implementation must scope records by authenticated tenantId.
    return []; 
  },

  create: async (house: House, tenantId: string): Promise<House> => {
    if (!tenantId) {
      throw new Error('tenantId is required to create houses.');
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    return house;
  },

  update: async (house: House, tenantId: string): Promise<House> => {
    if (!tenantId) {
      throw new Error('tenantId is required to update houses.');
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    return house;
  },

  delete: async (id: string, tenantId: string): Promise<void> => {
    if (!tenantId) {
      throw new Error('tenantId is required to delete houses.');
    }

    await new Promise(resolve => setTimeout(resolve, 500));
  }
};
