import { UserEntity } from '../../../core/domain/entities/UserEntity';

/**
 * Response contract for the GetUser
 */
export interface GetUserResponse {
  user?: UserItem;
}

/**
 * Response item contract for the GetUser
 */
export interface UserItem {
  name: string;
  middleName: string;
  lastName: string;
}

/**
 * Creates a GetUserResponse from a User
 * @param user User
 */
export function newGetUserResponse(user: UserEntity): GetUserResponse {

  const responseUser: UserItem = {
    name: user.name,
    middleName: user.middleName,
    lastName: user.lastName
  };

  const response: GetUserResponse = {
    user: responseUser
  };

  return response;
}