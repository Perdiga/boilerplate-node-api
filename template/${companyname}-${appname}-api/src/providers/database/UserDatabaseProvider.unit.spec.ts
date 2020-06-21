import { mock } from 'jest-mock-extended';
import { UserDatabaseProvider } from './UserDatabaseProvider';
import { PgRepository } from '../../frameworks/repositories/pg/pgRepository';
import { UserEntity } from '../../core/domain/entities/UserEntity';
import { stubFailure } from 'moxios';
import { promises } from 'dns';

const makeSut = (): any => {
  const mockRepository = mock<PgRepository>();
  const sut = new UserDatabaseProvider(mockRepository);
  const users: any[] = [
    { id: 1, name: 'Name MiddleName LastName' }
  ];

  mockRepository.query.mockReturnValue(Promise.resolve(users));

  return { sut, users, mockRepository };
};

describe('UserDatabaseProvider', (): void => {
  test('Should call the database with the right arguments', async (): Promise<void> => {
    // Arrange
    const { sut, users, mockRepository }: any = makeSut();

    // Act
    await sut.getUserById(users[0].id);

    // Asserts
    expect(mockRepository.query).toBeCalledTimes(1);
    expect(mockRepository.query).toBeCalledWith(sut.DEFAULT_GET_USER_BY_ID_QUERY, [users[0].id]);
  });

  test('Should return a user if exists', async (): Promise<void> => {
    // Arrange
    const { sut, users, mockRepository }: any = makeSut();

    // Act
    const result = await sut.getUserById(users[0].id);

    // Asserts
    expect(result).toStrictEqual(new UserEntity(users[0].id, users[0].name));
  });

  test('Should return null if user not found', async (): Promise<void> => {
    // Arrange
    const { sut, users, mockRepository }: any = makeSut();

    // Arrange
    mockRepository.query.mockReturnValue(Promise.resolve([]));

    // Act
    const result = await sut.getUserById(users[0].id);

    expect(result).toBe(null);
  });
});