import { injectable, inject } from 'inversify';
import { UserService } from '../../core/usecases/service/UserService';
import { UserEntity } from '../../core/domain/entities/UserEntity';
import { AppInterfaces } from '../../core/domain/entities/base/appInterfaces';
import * as Network from '../../frameworks/network/http';

/**
 * Service implementation for the UserService contract
 */
@injectable()
export class UserSampleNetworkProvider implements UserService {
  constructor (
    // add http injection
    @inject(AppInterfaces.Http) private network: Network.Http
  ) { }

  public async getUserById(userId: number): Promise<UserEntity | null> {
    const url = `https://jsonplaceholder.typicode.com/users/${userId}`;

    try {
      const response: Network.HttpResponse = await this.network.get(url);

      // Transform an external object to a UserEntity
      return new UserEntity(response.data.id, response.data.name);
    } catch (err) {
      return null;
    }
  }
}
