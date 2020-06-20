import { injectable } from 'inversify';
import { PgPoolConnection } from './pgPoolConnection';
import { Repository } from '../repository';
import { Logger } from '../../loggers/pino';
import { PoolClient } from 'pg';

/**
 * A client for executing requests on a postgres database
 */
@injectable()
export class PgRepository implements Repository {
    pgPoolConnection: PgPoolConnection;

    constructor () {
        this.pgPoolConnection = PgPoolConnection.getInstance();
    }

    public async query(queryString: string, queryParams: any[]): Promise<any[]> {
        try {
            return (await this.pgPoolConnection.pool.query(queryString, queryParams)).rows || [];
        } catch (err) {
            Logger.error('Error while executing a SQL.', err);
            throw new Error(err.message);
        }
    }

    public async getClient(): Promise<PoolClient> {
        return this.pgPoolConnection.pool.connect();
    }
}