'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {

  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }


  }


  orders.init({
    order_no: Sequelize.STRING,
    ref_no: Sequelize.STRING,
    gross_total: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    tax_disc: Sequelize.TEXT,
    isPaid: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    amount_due: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    amount_paid: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    amount_payable: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    notes: Sequelize.STRING,
    order_status: {
      type: Sequelize.STRING,
      defaultValue: 'unpaid'
    },
    recordedAt: {
      type: Sequelize.DATEONLY,
      defaultValue: new Date
     },
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE},
  }, {
    sequelize,
    timestamps: true,
    modelName: 'orders',
  },)

  orders.associate = function (models) {
    orders.belongsTo(models.businesses, {
      foreignKey: 'businessId', as: "business"  
    });

    orders.belongsTo(models.users, {
      foreignKey: 'userId', as: "createdBy"  
    });


    orders.hasMany(models.order_items);
    orders.hasMany(models.payments);
    orders.belongsToMany(models.customers, {
      through: "customer_orders",
      foreignKey: "orderId",
      otherKey: "customerId",
      constraints: false   
        }
      );
  };


  return orders;
};