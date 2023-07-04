import { v4 } from 'uuid';
import { ImmutableDateTime } from './shared.js';

type EnvelopeId = string;
export type Envelopes = Envelope[] | [];

export class Envelope {
    constructor(
        readonly id: EnvelopeId,
        readonly payload: object,
        readonly occurredAt: ImmutableDateTime,
    ) {}
}
