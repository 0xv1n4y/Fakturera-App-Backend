const { Product } = require('../models');

async function productsRoutes(fastify) {

  //To get all products
  fastify.get('/products', async (request, reply) => {
    try {
      const { sortBy } = request.query;
      let order = [];
  
      if (sortBy === 'articleNo') {
        order = [['articleNo', 'ASC']];
      } else {
        order = [['id', 'ASC']];
      }
  
      const products = await Product.findAll({
        order: order,
      });
  
      reply.send(products);
    } catch (error) {
      fastify.log.error('Error fetching products:', error);
      reply.status(500).send({
        statusCode: 500,
        error: 'Internal Server Error',
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
  
      await product.update({
        articleNo: updates.articleNo || product.articleNo, 
        productService: updates.productService || product.productService, 
        price: updates.price || product.price,
        inPrice: updates.inPrice || product.inPrice, 
        inStock: updates.inStock || product.inStock, 
        unit: updates.unit || product.unit,
        description: updates.description || product.description,
      });
  
      reply.status(200).send({ status: 'success', data: product });
    } catch (error) {
      request.log.error(error);
      reply.status(500).send({ status: 'error', message: 'Unable to update product' });
    }
  });

}

module.exports = productsRoutes;