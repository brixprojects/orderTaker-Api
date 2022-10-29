'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  products.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    uom: { 
      type: DataTypes.STRING,
      defaultValue: 'piece'
    },
    price:  { 
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    limit:  { 
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    purchase_price:  { 
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    stocks: { 
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    cover: { 
      type: DataTypes.STRING,
      defaultValue: 'noproduct.jpg'
    },
    starred: { 
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
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
    modelName: 'products',
  });



  products.associate = function (models) {
    products.belongsToMany(models.tags, {
      through: "product_tags",
      as: "labels",
      foreignKey: "productId",
      otherKey: "tagId"
    });

    products.hasMany(models.purchases);

    products.belongsToMany(models.other_amounts, {
      through: "product_other_amounts",
      foreignKey: "productId",
      otherKey: "other_amountId",
      constraints: false
    });

    products.belongsTo(models.businesses, {
      foreignKey: 'businessId', as: "business"
    });
  };




  return products;
};