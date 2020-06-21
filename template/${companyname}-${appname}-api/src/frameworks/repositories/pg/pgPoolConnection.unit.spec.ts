import { PgPoolConnection } from './pgPoolConnection';
import { Pool } from 'pg';

describe('pgPoolConnection', (): void => {
    test('Should create a pg pool', async (): Promise<void> => {
        // Act
        const sut = PgPoolConnection.getInstance();

        // Assert
        expect(sut.pool).toBeInstanceOf(Pool);
    });

    test('Should return an existing pool if exists', async (): Promise<void> => {

        // Act
        const sutA = PgPoolConnection.getInstance();
        const sutB = PgPoolConnection.getInstance();

        // Assert
        expect(sutA.pool).toBe(sutB.pool);

    });
});