
import { Automation } from '../../shared/types/index';

/**
 * AutomationService
 * Simulates async API calls for managing Automations.
 */
export const AutomationService = {
  getAll: async (): Promise<Automation[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [];
  }
};