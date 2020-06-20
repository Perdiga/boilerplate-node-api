import { UserEntity } from './UserEntity';

describe('UserController', (): void => {
  describe('GetUserById', (): void => {

    test('Deveria retornar um objeto com primeiro nome, nome do meio e último nome ', async (): Promise<void> => {
      const userId: number = 1;
      const userName: string = 'First Middle Last';

      // act
      // SUT = System Under Test
      const sut = new UserEntity(userId, userName);

      // assert
      expect(sut.name).toBe('First');
      expect(sut.middleName).toBe('Middle');
      expect(sut.lastName).toBe('Last');
    });

    test('Deveria retornar um objeto com primeiro nome, nome do meio e último nome todos vazio ', async (): Promise<void> => {
      // act
      const userId: number = 1;

      // act
      // SUT = System Under Test
      const sut = new UserEntity(userId, null as any);

      // assert
      expect(sut.name).toBe('');
      expect(sut.middleName).toBe('');
      expect(sut.lastName).toBe('');
    });

  });
});
