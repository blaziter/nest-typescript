import { Pool, QueryConfig, QueryResultRow } from 'pg';

import { Injectable } from '@nestjs/common';

@Injectable()
export class PostgresService {
  constructor() {}

  async query(query: QueryConfig<any[]>): Promise<QueryResultRow> {
    const db = new Pool({
      user: process.env.DB_USR,
      host: process.env.DB_HOST,
      password: process.env.DB_PWD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });

    const { rows } = await db.query(query);

    await db.end();

    return rows;
  }
}
