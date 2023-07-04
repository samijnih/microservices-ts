import pgPromise from 'pg-promise';
import config from '../../config.js';
import { IClient } from 'pg-promise/typescript/pg-subset';

export type Connection = pgPromise.IDatabase<{}, IClient>;
export const pgp = pgPromise({ capSQL: true });
const connection: Connection = pgp(config.DATABASE_DSN);

export default connection;
