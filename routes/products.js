const { Product } = require('../models');
const { ValidationError, DatabaseError, UniqueConstraintError } = require('sequelize');

async function productsRoutes(fastify) {

  // Get all products
  fastify.get('/products', async (request, reply) => {
    try {
      const { sortBy } = request.query;

      const order = (sortBy === 'articleNo') ? [['articleNo', 'ASC']] : [['id', 'ASC']];
      const products = await Product.findAll({ order });

      reply.send(products);
    } catch (error) {
      fastify.log.error('Error fetching products:', error);
      reply.status(500).send({
        status: 'error',
        message: 'Failed to fetch products. Please try again later.'
      });
    }
  });

  // Update product
  fastify.put('/products/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const updates = request.body;

      const product = await Product.findByPk(id);

      if (!product) {
        return reply.status(404).send({ status: 'error', message: 'Product not found' });
      }

      await product.update(updates);

      return reply.status(200).send({ status: 'success', data: product });

    } catch (error) {
      request.log.error('Error updating product:', error);

      // Unique constraint violation (e.g., duplicate articleNo)
      if (error instanceof UniqueConstraintError) {
        return reply.status(400).send({
          status: 'fail',
          message: error.errors?.[0]?.message || 'Unique constraint violation.',
          field: error.errors?.[0]?.path || null
        });
      }

      // Sequelize validation error (min, max, not null, etc.)
      if (error instanceof ValidationError) {
        return reply.status(400).send({
          status: 'fail',
          message: 'Validation error.',
          errors: error.errors.map(e => ({
            field: e.path,
            message: e.message
          }))
        });
      }

      // Type casting error (e.g., string passed to DECIMAL or INTEGER)
      if (error instanceof DatabaseError) {
        const invalidValue = Object.entries(request.body).find(([_, value]) =>
          error.message.includes(value)
        );
        const field = invalidValue?.[0] || 'unknown';

        return reply.status(400).send({
          status: 'fail',
          message: `Invalid input type for field "${field}"`,
          detail: error.message
        });
      }

      // Fallback for any unknown errors
      return reply.status(500).send({
        status: 'error',
        message: 'An unexpected error occurred while updating the product.'
      });
    }
  });
}

module.exports = productsRoutes;
