import { mock } from 'jest-mock-extended';
import { ExpectedError, BusinessError, InternalError, NotFoundError, ValidationError } from './errors';

describe('Errors', (): void => {

  test('Deveria retornar um objeto do tipo ExpectedError', async (): Promise<void> => {
    // arrange

    // act
    const expectedError: ExpectedError = new ExpectedError('Any Code', 'Any message');

    // assert
    expect(expectedError.code).toBe('Any Code');
    expect(expectedError.message).toBe('Any message');
  });

  test('Deveria retornar um objeto do tipo BusinessError', async (): Promise<void> => {
    // arrange

    // act
    const businessError: BusinessError = new BusinessError('Any message');

    // assert
    expect(businessError.code).toBe('BUSINESS_ERROR');
    expect(businessError.message).toBe('Any message');
  });

  test('Deveria retornar um objeto do tipo InternalError', async (): Promise<void> => {
    // arrange

    // act
    const internalError: InternalError = new InternalError('Any message');

    // assert
    expect(internalError.code).toBe('INTERNAL_ERROR');
    expect(internalError.message).toBe('Any message');
  });

  test('Deveria retornar um objeto do tipo InternalError', async (): Promise<void> => {
    // arrange

    // act
    const internalError: InternalError = new InternalError();

    // assert
    expect(internalError.code).toBe('INTERNAL_ERROR');
    expect(internalError.message).toBe('Internal error.');
  });

  test('Deveria retornar um objeto do tipo NotFoundError', async (): Promise<void> => {
    // arrange

    // act
    const notFoundError: NotFoundError = new NotFoundError('Any message');

    // assert
    expect(notFoundError.code).toBe('NOT_FOUND_ERROR');
    expect(notFoundError.message).toBe('Any message');
  });

  test('Deveria retornar um objeto do tipo ValidationError', async (): Promise<void> => {
    // arrange

    // act
    const validationError: ValidationError = new ValidationError(['any_field'], 'Any message');

    // assert
    expect(validationError.code).toBe('VALIDATION_ERROR');
    expect(validationError.message).toBe('Any message');
    expect(validationError.fields).toStrictEqual(['any_field']);
  });

  test('Deveria retornar um objeto do tipo ValidationError', async (): Promise<void> => {
    // arrange

    // act
    const validationError: ValidationError = new ValidationError(['any_field']);

    // assert
    expect(validationError.code).toBe('VALIDATION_ERROR');
    expect(validationError.message).toBe('One or more fields are invalid');
    expect(validationError.fields).toStrictEqual(['any_field']);
  });

});