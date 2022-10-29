'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  payments.init({
    description: Sequelize.STRING,
    type: Sequelize.STRING,
    amount: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    recordedAt: {
      type: Sequelize.DATEONLY,
      defaultValue: new Date
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
    modelName: 'payments',
  });


  payments.associate = function (models) {
    payments.belongsTo(models.businesses, {
      foreignKey: 'businessId', as: "business"  
    });
    payments.belongsTo(models.orders);

    payments.belongsTo(models.users, {
      foreignKey: 'userId', as: "receivedBy"  
    });    


  };


  return payments;
};