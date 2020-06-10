import { mock } from 'jest-mock-extended';
import { GetUserUseCase } from './GetUserUseCase';
import { UserEntity } from '../domain/entities/UserEntity';
import { UserService } from './service/UserService';
import { NotFoundError } from '../domain/entities/base/errors';

// SUT = System Under Test
const makeSut = (user?: UserEntity): any => {
  const mockUserService = mock<UserService>();
  const sut = new GetUserUseCase(mockUserService);

  if (user) {
    mockUserService.getUserById.mockReturnValue(Promise.resolve(user));
  }

  return { sut, mockUserService };
};

describe('GetUserUseCase', (): void => {

  test('Deveria retornar um usuário', async (): Promise<void> => {
    // arrange
    const userId: number = 1;
    const user: UserEntity = new UserEntity(undefined, 'any_name any_middle_name any_las_name');

    // act
    const { sut, mockUserService }: any = makeSut(user);
    const result = await sut.getUserById(userId);

    // assert
    expect(result).toStrictEqual(user);
    expect(mockUserService.getUserById).toBeCalledWith(userId);
  });

  test('Deveria retornar um erro caso o usuário não seja encontrado', async (): Promise<void> => {
    // arrange
    const userId = 1;

    // act
    const { sut, mockUserService }: any = makeSut();
    mockUserService.getUserById.mockReturnValue(Promise.resolve(null));

    try {
      await sut.getUserById(userId);
    } catch (error) {
      // assert
      expect(error).toStrictEqual(new NotFoundError('User not found'));
      expect(mockUserService.getUserById).toBeCalledWith(userId);
    }
  });

});