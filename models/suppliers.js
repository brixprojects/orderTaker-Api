'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class suppliers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  suppliers.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    contactPerson: DataTypes.STRING,
    deletedAt: DataTypes.DATE,
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  }, {
    sequelize,
    modelName: 'suppliers',
  });


  suppliers.associate = function (models) {
    suppliers.belongsToMany(models.products, {
      through: "product_suppliers",
      as: "suppliers",
      foreignKey: "supplierId",
      otherKey: "productId",
      constraints: false  
    });
  }

  return suppliers;
};