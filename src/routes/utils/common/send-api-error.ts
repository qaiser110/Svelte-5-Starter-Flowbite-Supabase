import { json } from '@sveltejs/kit';

export default function (message = 'An Error occured', field = '', statusCode = 400, status = 400) {
	return json(
		{
			message,
			field,
			status: status || statusCode,
		},
		{ status: statusCode }
	);
}
