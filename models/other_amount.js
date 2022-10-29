'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class other_amounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  other_amounts.init({
    name: Sequelize.STRING,
    value: Sequelize.INTEGER,
    type: Sequelize.STRING,
    amount_type: Sequelize.STRING,
    isActive: { 
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: new Date()
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: new Date()
    },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE
    }
  }, {
    sequelize,
    modelName: 'other_amounts',
  });


  other_amounts.associate = function (models) {

    other_amounts.belongsToMany(models.products, {
      through: "product_other_amounts",
      foreignKey: "other_amountId",
      otherKey: "productId",
      constraints: false
    });

    other_amounts.belongsToMany(models.order_items, {
      through: "order_items_other_amounts",
      foreignKey: "other_amountId",
      otherKey: "order_itemsId",
      constraints: false
    });


  };



  return other_amounts;
};