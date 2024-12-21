import { z } from 'zod';
import { strict as assert } from 'node:assert';

// `myString` is a string that can be either optional (undefined or missing),
// empty, or min 4
const myString = z
	.union([z.string().length(0), z.string().min(4)])
	.optional()
	.transform((e) => (e === '' ? undefined : e));

const schema = z.object({ test: myString });

assert(schema.parse({}).test === undefined); // missing string
assert(schema.parse({ test: undefined }).test === undefined); // string is undefined
assert(schema.parse({ test: '' }).test === undefined); // string is empty
assert(schema.parse({ test: '1234' }).test === '1234'); // string is min 4

// these successfully fail
assert(schema.safeParse({ test: '123' }).success !== true);
assert(schema.safeParse({ test: 3.14 }).success !== true);
