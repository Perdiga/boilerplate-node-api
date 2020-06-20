import { HttpOptions } from './HttpOptions';

describe('HttpOptions', (): void => {
  test('Deveria preencher apenas os atributos informados e o contentType com valor default', (): void => {
    const anyMethod = 'GET';
    const sut = new HttpOptions(anyMethod, 'any_url');

    expect(sut).toEqual({
      method: 'GET',
      target: 'any_url',
      body: undefined,
      queryString: undefined,
      headers: undefined,
      contentType: 'json'
    });
  });

  test('Deveria preencher todos os atributos da classe', (): void => {
    const anyMethod = 'GET';
    const sut = new HttpOptions(
      anyMethod,
      'any_url',
      'any_body',
      'any_query_string',
      'any_header',
      'any_content_type'
    );

    expect(sut).toEqual({
      method: 'GET',
      target: 'any_url',
      body: '\"any_body\"',
      queryString: '\"any_query_string\"',
      headers: 'any_header',
      contentType: 'any_content_type'
    });
  });
});