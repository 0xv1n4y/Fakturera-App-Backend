const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Term = sequelize.define('Term', {
    language: {
      type: DataTypes.STRING(2),
      allowNull: false,
      validate: {
        isIn: [['en', 'sv']],
      },
    },
    list: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    buttontitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'terms',
  });

  return Term;
};
