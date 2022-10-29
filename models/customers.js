'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class customers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  customers.init({
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    address: Sequelize.STRING,
    dpUrl: Sequelize.STRING,
    limit: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    balance: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    isPaid: {
      type: Sequelize.INTEGER,
      defaultValue: true
    },
    starred: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    deletedAt: Sequelize.DATE,
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: new Date()
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: new Date()
    }
  }, {
    sequelize,
    modelName: 'customers',
  });



  customers.associate = function (models) {

    customers.belongsToMany(models.tags, {
      through: "customer_tags",
      foreignKey: "customerId",
      otherKey: "tagId",
      constraints: false  
    });

    customers.belongsToMany(models.phones, {
      through: "customer_phones",
      foreignKey: "phoneId",
      otherKey: "customerId",
      constraints: false  
    });

    customers.belongsToMany(models.orders, {
      through: "customer_orders",
      foreignKey: "customerId",
      otherKey: "orderId",
      constraints: false   
        }
      );

    customers.belongsTo(models.businesses, {
      foreignKey: 'businessId', as: "business"
    });
};


return customers;

}