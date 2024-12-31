import { z } from 'zod';

const email = z
	.string({
		required_error: 'Email is required',
		invalid_type_error: 'Email must be a string',
	})
	.email('Please enter a valid email address')
	.min(1, 'Email is required')
	.max(255, 'Email must be less than 255 characters');

const phoneRegex = new RegExp(/^\+[1-9]{2}[0-9]{9,11}$/);
const phone = z
	.string({
		required_error: 'Mobile number is required',
		invalid_type_error: 'Mobile number is invalid',
	})
	.regex(phoneRegex, 'Invalid Number!');

const password = z
	.string({
		required_error: 'Password is required',
		invalid_type_error: 'Password must be a string',
	})
	.min(4, 'Password must be at least 6 characters')
	.max(72, 'Password must be less than 72 characters');
// .regex(
//  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{6,}$/,
//  'Password must contain at least one uppercase letter, one lowercase letter, and one number'
// );

export enum LoginType {
	login = 'login',
	pwdLess = 'pwdLess',
	register = 'register',
	registerMobile = 'registerMobile',
}

export const authSchema = z.discriminatedUnion('loginType', [
	z.object({
		loginType: z.literal(LoginType.register),
		email,
		password,
		// confirmPassword, /* in case needed */
	}),
	z.object({
		loginType: z.literal(LoginType.registerMobile),
		phone,
		password,
		// confirmPassword, /* in case needed */
	}),
	z.object({
		loginType: z.literal(LoginType.login),
		email,
		password,
	}),
	z.object({
		loginType: z.literal(LoginType.pwdLess),
		email,
	}),
]);

export type AuthSchema = z.infer<typeof authSchema>;
