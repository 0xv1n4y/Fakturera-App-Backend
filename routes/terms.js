const { Term } = require('../models');

async function termsRoutes(fastify) {
    fastify.get('/terms/:language', async (request, reply) => {
        const { language } = request.params;
        try {
            const terms = await Term.findAll({
                where: { language },
                order: [['created_at', 'ASC']],
            });

            if (terms.length === 0) {
                return reply.status(404).send({ error: `No terms found for language ${language}` });
            }

            reply.send(terms);
        } catch (error) {
            console.error('Error fetching terms:', error);
            reply.status(500).send({ error: 'Failed to fetch terms' });
        }
    });
}

module.exports = termsRoutes;
