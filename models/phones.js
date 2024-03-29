'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class phones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  phones.init({
    phone: Sequelize.STRING,
    label: Sequelize.STRING,
    notes: Sequelize.STRING,
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
    modelName: 'phones',
  });


  phones.associate = function (models) {
    phones.belongsToMany(models.users, {
      through: "user_phones",
      foreignKey: "phoneId",
      otherKey: "userId",
      constraints: false
    });

    phones.belongsToMany(models.customers, {
      through: "customer_phones",
      foreignKey: "phoneId",
      otherKey: "customerId",
      constraints: false
    });

  };



  return phones;
};