'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class purchases extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  purchases.init({
    quantity: Sequelize.INTEGER,
    amount: Sequelize.INTEGER,
    notes: Sequelize.STRING,
    deletedAt: Sequelize.DATE,
    purchasedAt: { 
      type: Sequelize.DATE,
      defaultValue: new Date()
    },
    recordedAt: {
      type: Sequelize.DATEONLY,
      defaultValue: new Date
     }  
  }, {
    sequelize,
    timestamps: true,
    modelName: 'purchases',
  });

  purchases.associate = function (models) {
    purchases.belongsTo(models.users, { as: "purchaser"
    });
  };






  return purchases;
};