
import { User } from '../../shared/types/index';

/**
 * UserService
 * Simulates async API calls for managing User entities.
 */
export const UserService = {
  getAll: async (): Promise<User[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [];
  },

  create: async (user: User): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return user;
  },

  delete: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
  }
};
