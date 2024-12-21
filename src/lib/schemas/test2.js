import { z } from 'zod';
import { strict as assert } from 'node:assert';

const email = z.string().email();
const username = z.string();
const password = z.string().min(4);

const AuthType = {
	login: 'login',
	register: 'register',
	pwdLess: 'pwdLess',
};

const CommonFields = z.object({
	email,
});

const authSchema = z.discriminatedUnion('loginType', [
	z
		.object({
			loginType: z.literal(AuthType.register),
			username,
			password,
			extraOption: z.number(),
		})
		.merge(CommonFields),
	z.object({
		loginType: z.literal(AuthType.login),
		password,
	}),
	z
		.object({
			loginType: z.literal(AuthType.pwdLess),
		})
		.merge(CommonFields),
]);

// const schema = z.object({ test: mySchema });

const valid_pwdless = { loginType: 'pwdLess', email: 'q@abc.com' };

assert.deepEqual(authSchema.parse(valid_pwdless), valid_pwdless);

assert(authSchema.safeParse({ loginType: 'pwdLess', email: 'abc' }).success === false);

// fails without password password
assert(authSchema.safeParse({ loginType: 'login', email: 'q@abc.com' }).success === false);
assert(
	authSchema.safeParse({ loginType: 'login', email: 'q@abc.com', password: '12345' }).success ===
		true
);

// assert(schema.parse({}).test === undefined); // missing string
// assert(schema.parse({ test: undefined }).test === undefined); // string is undefined
// assert(schema.parse({ test: '' }).test === undefined); // string is empty
// assert(schema.parse({ test: '1234' }).test === '1234'); // string is min 4

// // these successfully fail
// assert(schema.safeParse({ test: '123' }).success !== true);
// assert(schema.safeParse({ test: 3.14 }).success !== true);
