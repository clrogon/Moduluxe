
import { Booking } from '../../shared/types/index';

/**
 * BookingService
 * Simulates async API calls for managing Booking entities.
 */
export const BookingService = {
  getAll: async (): Promise<Booking[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [];
  }
};
