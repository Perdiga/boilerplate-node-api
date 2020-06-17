import { mock } from 'jest-mock-extended';
import { UserSampleNetworkProvider } from './UserSampleNetworkProvider';
import * as Network from '../../frameworks/network/http';
import { UserEntity } from '../../core/domain/entities/UserEntity';

import { NotFoundError } from '../../core/domain/entities/base/errors';

const makeSut = (responseData?: any): any => {
  const mockHttp = mock<Network.Http>();
  const sut = new UserSampleNetworkProvider(mockHttp);

  if (responseData) {
    mockHttp.get.mockReturnValue(
      new Promise((resolve: any, reject: any): any => {
        const response = {
          status: 200,
          statusText: 'OK',
          headers: '',
          config: '',
          baseURL: '',
          timeout: 0,
          method: 'GET',
          data: responseData
        };
        resolve(response);
      })
    );
  }

  return { sut, mockHttp };
};

describe('UserSampleNetworkProvider', (): void => {
  test('Deveria chamar o serviço jsonplaceholder.typicode.com/users', async (): Promise<void> => {
    const userId: number = 1;
    const url = `https://jsonplaceholder.typicode.com/users/${userId}`;

    const { sut, mockHttp }: any = makeSut({});
    await sut.getUserById(userId);

    expect(mockHttp.get).toBeCalledTimes(1);
    expect(mockHttp.get).toBeCalledWith(url);
  });

  test('Deveria retornar o usuário encontrado', async (): Promise<void> => {
    const userId: number = 1;
    const firstName: string = 'any_first_name';
    const middleName: string = 'any_middle_name';
    const lastName: string = 'any_last_name';
    const responseData = {
      id: userId,
      name: `${firstName} ${middleName} ${lastName}`
    };

    const { sut }: any = makeSut(responseData);
    const result: UserEntity = await sut.getUserById(userId);

    expect(result.id).toBe(userId);
    expect(result.name).toBe(firstName);
    expect(result.middleName).toBe(middleName);
    expect(result.lastName).toBe(lastName);
  });

  test('Deveria retornar null quando o usuário não for encontrado', async (): Promise<void> => {
    const userId = 1;
    const httpGetStub = async (): Promise<Network.HttpResponse> => {
      throw new NotFoundError('User not found');
    };

    const { sut, mockHttp }: any = makeSut();
    mockHttp.get.mockImplementation(httpGetStub);

    const result = await sut.getUserById(userId);
    expect(result).toBe(null);
  });
});