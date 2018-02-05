const PORT = process.env.PORT || 5000
const fastify = require('fastify')()

const schema = {
	schema: {
		response: {
			200: {
				type: 'object',
				properties: {
					hello: {
						type: 'string'
					}
				}
			}
		}
	}
}

fastify
	.get('/', schema, function (req, reply) {
		reply
			.send({hello: 'world'})
	})
	.listen(PORT, err => {
	if (err) throw err
	console.log(`server listening on ${fastify.server.address().port}`)
})
