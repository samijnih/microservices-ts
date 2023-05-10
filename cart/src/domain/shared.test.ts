import { Command, ImmutableDateTime } from './shared';
import { DomainEvent } from './aggregate';
import { clock, given, NOW, when } from '../../tests/helpers';
import dayjs from 'dayjs';
import * as console from 'console';

describe('DomainEvent', () => {
    class StubbedDomainEvent extends DomainEvent {
        constructor() {
            super(clock.fromString(NOW));
        }

        serialize(): Readonly<{ foo: string; bar: string }> {
            return {
                foo: 'foo',
                bar: 'bar',
            };
        }

        name(): string {
            return 'stubbed.event';
        }
    }

    test('is serializable', () => {
        const sut = given(new StubbedDomainEvent());

        const actual = when(sut.serialize());

        expect(actual).toStrictEqual({
            foo: 'foo',
            bar: 'bar',
        });
    });

    test('is named', () => {
        const sut = given(new StubbedDomainEvent());

        const actual = when(sut.serialize());

        expect(actual).toStrictEqual('stubbed.event');
    });
});

describe('Command', () => {
    class StubbedCommand implements Command {
        serialize(): Readonly<{ foo: string; bar: string }> {
            return {
                foo: 'foo',
                bar: 'bar',
            };
        }

        name(): string {
            return 'stubbed.command';
        }
    }

    test('is serializable', () => {
        const sut = given(new StubbedCommand());

        const actual = when(sut.serialize());

        expect(actual).toStrictEqual({
            foo: 'foo',
            bar: 'bar',
        });
    });

    test('is named', () => {
        const sut = given(new StubbedCommand());

        const actual = when(sut.name());

        expect(actual).toStrictEqual('stubbed.command');
    });
});
