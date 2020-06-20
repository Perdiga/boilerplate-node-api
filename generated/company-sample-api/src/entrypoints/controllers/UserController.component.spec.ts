import moxios from 'moxios';
import request from 'supertest';

import APP from '../../frameworks/webserver/express/app';

describe('UserController', (): void => {
  describe('GET /user/:user', (): void => {
    beforeEach((): void => {
      moxios.install();
    });

    afterEach((): void => {
      moxios.uninstall();
    });

    test('Deveria retornar 200 e os dados do usuário encontrado', async (): Promise<void> => {
      moxios.stubRequest(/jsonplaceholder.typicode.com\/users/, {
        status: 200,
        response: {
          id: 1,
          name: 'Leanne Graham'
        }
      });

      await request(APP)
        .get('/user/1')
        .expect(200)
        .expect({
          user: {
            name: 'Leanne',
            middleName: '',
            lastName: 'Graham'
          }
        });

      expect(moxios.requests.mostRecent().url).toBe('https://jsonplaceholder.typicode.com/users/1');
    });

    test('Deveria retornar 404 quando o usuário não for encontrado', async (): Promise<void> => {
      moxios.stubRequest(/jsonplaceholder.typicode.com\/users/, {
        status: 404
      });

      await request(APP)
        .get('/user/2')
        .expect(404)
        .expect({
          code: 'NOT_FOUND_ERROR',
          message: 'User not found'
        });
      expect(moxios.requests.mostRecent().url).toBe('https://jsonplaceholder.typicode.com/users/2');
    });

    test('Deveria retornar 400 quando um id de usuário inválido for fornecido', async (): Promise<void> => {
      await request(APP)
        .get('/user/aaa')
        .expect(400)
        .expect({
          code: 'VALIDATION_ERROR',
          message: 'One or more fields are invalid',
          fields: ['userId']
        });
    });
  });
});