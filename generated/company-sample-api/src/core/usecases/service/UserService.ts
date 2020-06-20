import { UserEntity } from '../../domain/entities/UserEntity';

/**
 * Contract for User service implementations
 */
export interface UserService {

  /**
   * Get the user by id
   * @param {number} userId The user unique identifier
   */
  getUserById(userId: number): Promise<UserEntity | null>;

}
