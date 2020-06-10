import { inject, injectable } from 'inversify';
import { Controller, Get, Route, Tags, Response } from 'tsoa';
import { GetUserUseCase } from '../../core/usecases/GetUserUseCase';
import { UserEntity } from '../../core/domain/entities/UserEntity';
import { GetUserResponse, newGetUserResponse } from './models/UserResponse';
import { ValidationError, BusinessError, NotFoundError, InternalError } from '../../core/domain/entities/base/errors';

/**
 * REST API for GetUser operations
 */
@Route('/')
@Tags('User')
@injectable()
export class UserController extends Controller {
  constructor (
    @inject(GetUserUseCase) private getUserUseCase: GetUserUseCase) {
    super();
  }

  @Get('/user/{userId}')
  @Response<ValidationError>('400', 'Bad Request')
  @Response<BusinessError>('422', 'Business Error')
  @Response<NotFoundError>('404', 'Not Found Error')
  public async getUserById(userId: number): Promise<GetUserResponse> {
    const user: UserEntity = await this.getUserUseCase.getUserById(userId);

    return newGetUserResponse(user);
  }

}
