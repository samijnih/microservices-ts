import pgPromise from 'pg-promise';
import config from '../../config.js';
import { IClient } from 'pg-promise/typescript/pg-subset';

export type Connection = pgPromise.IDatabase<{}, IClient>;
const pgp = pgPromise();
const connection: Connection = pgp(config.DATABASE_DSN);

export default connection;
