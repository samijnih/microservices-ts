import process from 'process';

interface ENV {
    NODE_ENV: string | undefined;
    DATABASE_DSN: string | undefined;
}

interface Config {
    NODE_ENV: string;
    DATABASE_DSN: string;
}

const getConfig = (): ENV => {
    return {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_DSN: process.env.DATABASE_DSN,
    };
};

const getSanitizedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in .env`);
        }
    }

    return config as Config;
};

const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;
