import { StubbedClock } from './stub/clock';

export const clock = new StubbedClock();
export const NOW = '2023-06-23T15:00:00.100000+00:00';
export const CREATED_AT = '2020-05-01T00:00:00.200000+00:00';
export const UPDATED_AT = '2022-12-05T10:30:04.400000+00:00';
export const given = <T>(given: T) => given;
export const when = <T>(when: T) =>
    typeof when === 'function' ? when() : when;
