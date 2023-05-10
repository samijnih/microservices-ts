import pgPromise from 'pg-promise';

const pgp = pgPromise();
const database = pgp('postgres://postgres:postgres@cart-db/cart');

export default database;
