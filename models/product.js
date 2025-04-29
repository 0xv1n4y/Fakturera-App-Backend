const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    articleNo: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'article_no',
      unique: true,
    },
    productService: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'product_service',
    },
    price: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      validate: { min: 0 },
      field:'price'
    },
    inPrice: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      field: 'in_price',
      validate: { min: 0 },
    },
    inStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'in_stock',
      defaultValue: 0,
      validate: { min: 0 },
    },
    unit: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return Product;
};
