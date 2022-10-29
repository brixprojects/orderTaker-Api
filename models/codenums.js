'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class codenum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here


    }
  }
  codenum.init({
    common: DataTypes.STRING,
    count: {
      type: DataTypes.INTEGER, 
      defaultValue: 0      
    },
    codeType: {
      type: DataTypes.STRING, 
      defaultValue: 'order'      
    },
    digit: {
      type: DataTypes.INTEGER, 
      defaultValue: 6    
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
    modelName: 'codenums',
  });
  return codenum;
};