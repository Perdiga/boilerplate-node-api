/**
 * Contract for repository implementations
 */
export interface Repository {

  /**
   * Execute a query and return an array of records
   * You shuld not use this method inside a transaction
   * @param queryString Query that will be executed
   * @param queryParams The array of arguments taht will be used to execute the query
   */
  query(queryString: string, queryParams: any[]): Promise<any[]>;

  /**
   * Return a specific database client from the pool
   * You should use this method if you need to execute queries in a transaction
   * @returns a database client
   */
  getClient(): Promise<any>;

}
