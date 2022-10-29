'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class order_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order_items.init({
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    qty: Sequelize.INTEGER,
    price: Sequelize.INTEGER,
    sub_total: Sequelize.INTEGER,
    total: Sequelize.INTEGER,
    notes: Sequelize.STRING,
    uom: { 
      type: Sequelize.STRING,
      defaultValue: 'piece'
    },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE}
  }, {
    sequelize,
    modelName: 'order_items',
  });

  order_items.associate = function (models) {
    order_items.belongsTo(models.orders);
    order_items.belongsTo(models.products);

    order_items.belongsToMany(models.other_amounts, {
      through: "order_items_other_amounts",
      foreignKey: "order_itemsId",
      otherKey: "other_amountId",
      constraints: false
    });


  };
  return order_items;
};