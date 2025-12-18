
import { MaintenanceRequest } from '../../shared/types/index';

/**
 * MaintenanceService
 * Simulates async API calls for managing Maintenance Requests.
 */
export const MaintenanceService = {
  getAll: async (): Promise<MaintenanceRequest[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [];
  }
};