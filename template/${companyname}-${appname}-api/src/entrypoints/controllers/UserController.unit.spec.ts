import { mock } from 'jest-mock-extended';
import { UserController } from './UserController';
import { GetUserUseCase } from '../../core/usecases/GetUserUseCase';
import { UserEntity } from '../../core/domain/entities/UserEntity';
import { newGetUserResponse } from './models/UserResponse';

import { InternalError, BusinessError, ValidationError, NotFoundError } from '../../core/domain/entities/base/errors';

// SUT = System Under Test
const makeSut = (user?: UserEntity): any => {
  const mockGetUserUseCase = mock<GetUserUseCase>();
  const sut = new UserController(mockGetUserUseCase);

  if (user) {
    mockGetUserUseCase.getUserById.mockReturnValue(Promise.resolve(user));
  }

  return { sut, mockGetUserUseCase };
};

describe('UserController', (): void => {
  describe('GetUserById', (): void => {

    test('Deveria retornar um usuário ', async (): Promise<void> => {
      // arrange
      const userId: number = 1;
      const user: UserEntity = new UserEntity(userId, 'any_name any_middle_name any_las_name');

      // act
      const { sut, mockGetUserUseCase }: any = makeSut(user);
      const result = await sut.getUserById(userId);

      // assert
      expect(result).toStrictEqual(newGetUserResponse(user));
      expect(mockGetUserUseCase.getUserById).toBeCalledWith(userId);
    });

    test('Deveria retornar um erro caso o usuário não seja encontrado', async (): Promise<void> => {
      // arrange
      const userId = 1;
      const getUserByIdUseCaseStub = async (): Promise<UserEntity> => {
        throw new NotFoundError('User not found');
      };

      // act
      const { sut, mockGetUserUseCase }: any = makeSut();
      mockGetUserUseCase.getUserById.mockImplementation(getUserByIdUseCaseStub);

      try {
        await sut.getUserById(userId);
      } catch (error) {
        // assert
        expect(error).toStrictEqual(new NotFoundError('User not found'));
        expect(mockGetUserUseCase.getUserById).toBeCalledWith(userId);
      }
    });
  });
});