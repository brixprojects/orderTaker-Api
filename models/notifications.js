'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notifications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  notifications.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    type: {
      type: DataTypes.STRING,
      defaultValue: 'SALES'
    },
    action: {
      type: DataTypes.STRING,
      defaultValue: 'void'
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'published'
    },
    audience: {
      type: DataTypes.STRING,
      defaultValue: 'admin'
    },
    note: DataTypes.STRING
  }, {
    sequelize,
    timestamps: true,
    modelName: 'notifications',
  });

  notifications.associate = function (models) {
    notifications.belongsToMany(models.users, {
      as: 'views',
      through: "notification_views",
      foreignKey: "notificationId",
      otherKey: "userId",
      constraints: false   
        }
      );
    
      notifications.belongsTo(models.users, {
        as: 'sender',
        constraints: false   
          }
        );  
      

  };


  return notifications;
};