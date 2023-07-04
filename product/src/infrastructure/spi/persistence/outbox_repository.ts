import { OutboxRepository } from '../../../domain/spi.js';
import { Envelope, Envelopes } from '../../../domain/envelope.js';
import { Connection, pgp } from '../database/connection.js';
import clock from '../clock.js';
import { parse, v4 as uuidv4 } from 'uuid';

type EnvelopeRow = {
    id: string;
    payload: object;
    occurred_at: string;
};

export class PostgresOutboxRepository implements OutboxRepository {
    constructor(readonly connection: Connection, readonly table: string) {}

    async add(envelope: Envelope): Promise<void> {
        const query = `INSERT INTO ${this.table} (id, payload, created_at) VALUES ($1, $2, $3)`;
        await this.connection.none(query, [
            envelope.id.toString(),
            envelope.payload,
            envelope.occurredAt,
        ]);
    }

    async add(envelopes: Envelopes): Promise<void> {
        const columnSet = new pgp.helpers.ColumnSet(
            ['id', 'payload', 'occurred_at'],
            {
                table: this.table,
            },
        );

        const data = envelopes.map(envelope => ({
            id: envelope.id.toString(),
            payload: envelope.payload,
            occurred_at: envelope.occurredAt,
        }));

        const query = pgp.helpers.insert(data, columnSet);

        await this.connection.none(query);
    }

    async get(): Promise<Envelopes> {
        return await this.connection
            .manyOrNone(
                `SELECT * FROM ${this.table} ORDER BY occurred_at LIMIT 10 FOR UPDATE SKIP LOCKED`,
                (envelope: EnvelopeRow) =>
                    new Envelope(
                        uuidv4(parse(envelope.id)),
                        envelope.payload,
                        clock.fromString(envelope.occurred_at),
                    ),
            )
            .then(envelopes => {
                if (envelopes.length) {
                    return envelopes;
                }

                return [];
            });
    }
}
