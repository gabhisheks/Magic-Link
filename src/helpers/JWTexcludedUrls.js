// All the API points does not requires jwt token
exports.JWTexcludedUrls = [
	'/api/app/signup',
	/^\/api\/cms\/events\/fetch\/[a-zA-Z0-9].*/,
	'/api/cms/login',
	'/api/cms/register',
	'/api/cms/categories/add',
	'/api/cms/interests/add',
	'/api/stripe',
	/^\/api\/cms\/remove\/[a-zA-Z0-9].*/,
	'/api-docs/',
	'/api-docs',
	/^\/api-docs\/[a-zA-Z0-9].*/,
	'/api/sendmail',
	'/api/app/info'
];