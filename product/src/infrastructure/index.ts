import 'dotenv/config';
import express, { Express } from 'express';
import * as process from 'process';
import router from './routing/index.js';

const kernel: Express = express();
const port = 3001;

kernel.use(router);

const bootstrap = async () => {
    try {
        await kernel.listen(port);

        console.info(`Product server is running at http://localhost:${port}`);
    } catch (error) {
        console.error(error);

        process.exit(1);
    }
};

export default bootstrap();
