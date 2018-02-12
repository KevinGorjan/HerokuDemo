const fastify = require('fastify')();
const fastifyPointOfView = require('point-of-view');
const ejs = require('ejs')
const fastifyStatic = require('fastify-static');
const path = require('path');
const resolve = require('path').resolve;

const serverOptions = {
	interface: '0.0.0.0',
	port: 5000
};

const templatesFolder = "views"
fastify.register(fastifyPointOfView, {
	engine: {
		ejs
	},
	includeViewExtension: true,
	templates: templatesFolder,
	options: {
		filename: resolve(templatesFolder)
	},
});

fastify.register(fastifyStatic, {
	root: path.join(__dirname, 'public'),
	prefix: '/assets'
});

fastify
	.get('/', (req, reply) => {
		reply
			.view('pages/index', {text: 'text'})
	});

fastify
	.listen(
		process.env.PORT || serverOptions.port,
		serverOptions.interface,
		err => {
			if (err) console.error(err);
			console.log(`server listening on ${fastify.server.address().port}`)
		});
