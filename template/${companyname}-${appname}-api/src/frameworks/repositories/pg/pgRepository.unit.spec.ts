import { mock } from 'jest-mock-extended';

import { PgRepository } from './pgRepository';
import { Pool } from 'pg';

// SUT = System Under Test
const makeSut = (): any => {
    const mockPool = mock<Pool>();
    const sut = new PgRepository();

    const rows: any[] = [
        { id: 1, name: 'Any Name' },
        { id: 1, name: 'Any Name' }
    ];

    mockPool.query.mockImplementation(async (): Promise<any> => {
        return Promise.resolve({ rows, count: rows.length });
    });

    mockPool.connect.mockImplementation(async (): Promise<any> => {
        return Promise.resolve(true);
    });

    sut.pgPoolConnection.pool = mockPool;

    return { sut, rows };
};

describe('pgRepository', (): void => {

    test('Should execute a query without parameters', async (): Promise<void> => {
        // Arrange
        const { sut, rows }: any = makeSut();
        const queryString = 'Select * from users';

        // Act
        const result = await sut.query(queryString, []);

        // Assert
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(rows.length);
        expect(sut.pgPoolConnection.pool.query).toBeCalledWith(queryString, []);
    });

    test('Should execute a query with parameters', async (): Promise<void> => {
        // Arrange
        const { sut, rows }: any = makeSut();
        const queryString = 'Select * from users where id = $1';
        const queryParams = [1];

        // Act
        const result = await sut.query(queryString, queryParams);

        // Assert
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(rows.length);
        expect(sut.pgPoolConnection.pool.query).toBeCalledWith(queryString, queryParams);
    });

    test('Should return an empty record array when rows ar empty', async (): Promise<void> => {
        // Arrange
        const { sut }: any = makeSut();
        sut.pgPoolConnection.pool.query.mockImplementation(async (): Promise<any> => {
            return Promise.resolve({});
        });
        const queryString = 'Select * from users';

        // Act
        const result = await sut.query(queryString, []);

        // Assert
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBe(0);
    });

    test('Should return an error is pg client fails', async (): Promise<void> => {
        // Arrange
        const { sut }: any = makeSut();
        sut.pgPoolConnection.pool.query.mockImplementation(async (): Promise<any> => {
            throw new Error('any error');
        });
        const queryString = 'Select * from users1';

        // Act
        try {
            await sut.query(queryString, []);
        } catch (error) {
            // Assert
            expect(error).toStrictEqual(new Error('any error'));
        }

    });

    test('Should return a database client', async (): Promise<void> => {
        // Arrange
        const { sut }: any = makeSut();

        // Act
        const result = await sut.getClient();

        // Assert
        expect(result).toBe(true);
        expect(sut.pgPoolConnection.pool.connect).toBeCalled();
    });

});