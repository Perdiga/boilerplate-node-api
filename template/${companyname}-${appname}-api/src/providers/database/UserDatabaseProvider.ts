import { injectable, inject } from 'inversify';
import { UserService } from '../../core/usecases/service/UserService';
import { UserEntity } from '../../core/domain/entities/UserEntity';
import { AppInterfaces } from '../../core/domain/entities/base/appInterfaces';
import { Repository } from '../../frameworks/repositories';

/**
 * Service implementation for the UserService contract
 */
@injectable()
export class UserDatabaseProvider implements UserService {
  constructor (
    @inject(AppInterfaces.Repository) private database: Repository
  ) { }

  DEFAULT_GET_USER_BY_ID_QUERY: string = 'SELECT * FROM USERS WHERE ID = $1';

  public async getUserById(userId: number): Promise<UserEntity | null> {

    const queryParams = [userId];

    const response: any[] = await this.database.query(this.DEFAULT_GET_USER_BY_ID_QUERY, queryParams);
    if (response && response.length) {
      return new UserEntity(response[0].id, response[0].name);
    }

    return null;
  }
}
