import amqp from 'amqplib';
import config from '../../config.js';

const connection = await amqp.connect(config.RABBITMQ_DSN);

export default connection;
