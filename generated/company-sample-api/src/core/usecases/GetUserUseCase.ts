import { inject, injectable } from 'inversify';
import { AppInterfaces } from '../domain/entities/base/appInterfaces';
import { UserEntity } from '../domain/entities/UserEntity';
import { NotFoundError } from '../domain/entities/base/errors';
import { UserService } from './service/UserService';

/**
 * Orchestration for the GetUser workflows
 */
@injectable()
export class GetUserUseCase {

  constructor (
    @inject(AppInterfaces.UserService) private service: UserService
  ) { }

  /**
   * Retrieves the User record, apply business logic on them and returns them
   * @param {number} userId The user unique identifier
   */
  public async getUserById(userId: number): Promise<UserEntity> {
    const userRetrieved = await this.service.getUserById(userId);

    // Here you can do some business logic, such as validate if the user is active or not, etc.
    if (!userRetrieved) {
      throw new NotFoundError('User not found');
    }

    return userRetrieved;
  }
}
