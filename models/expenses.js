'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class expenses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  expenses.init({
    description: Sequelize.STRING,
    deletedAt: Sequelize.DATE,
    supportingDocs: Sequelize.STRING,
    amount: Sequelize.INTEGER,
    notes: Sequelize.STRING,
    recordedAt: {
     type: Sequelize.DATEONLY,
     defaultValue: new Date
    }

  }, {
    sequelize,
    timestamps: true,
    modelName: 'expenses',
  });

  expenses.associate = function (models) {
    expenses.belongsTo(models.users);
  };

  return expenses;
};