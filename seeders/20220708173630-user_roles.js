'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('user_roles',[
          {
            userId: 1,
            roleId: 1,
            createdAt: new Date,
            updatedAt: new Date
        },
        {
          userId: 11,
          roleId: 2,
          createdAt: new Date,
          updatedAt: new Date
      },
      
    
      {
        userId: 2,
        roleId: 3,
        createdAt: new Date,
        updatedAt: new Date
    },
    {
      userId: 3,
      roleId: 4,
      createdAt: new Date,
      updatedAt: new Date
  },
  {
    userId: 4,
    roleId: 3,
    createdAt: new Date,
    updatedAt: new Date
},
{
  userId: 5,
  roleId: 4,
  createdAt: new Date,
  updatedAt: new Date
},
{
  userId: 6,
  roleId: 3,
  createdAt: new Date,
  updatedAt: new Date
},
{
  userId: 7,
  roleId: 4,
  createdAt: new Date,
  updatedAt: new Date
},
{
  userId: 8,
  roleId: 3,
  createdAt: new Date,
  updatedAt: new Date
},
{
  userId: 9,
  roleId: 4,
  createdAt: new Date,
  updatedAt: new Date
},
{
  userId: 10,
  roleId: 3,
  createdAt: new Date,
  updatedAt: new Date
},
{
  userId: 12,
  roleId: 4,
  createdAt: new Date,
  updatedAt: new Date
},
{
  userId: 13,
  roleId: 3,
  createdAt: new Date,
  updatedAt: new Date
},
{
  userId: 14,
  roleId: 4,
  createdAt: new Date,
  updatedAt: new Date
},
{
  userId: 15,
  roleId: 3,
  createdAt: new Date,
  updatedAt: new Date
},
{
  userId: 16,
  roleId: 4,
  createdAt: new Date,
  updatedAt: new Date
},
{
  userId: 17,
  roleId: 3,
  createdAt: new Date,
  updatedAt: new Date
},
{
  userId: 18,
  roleId: 4,
  createdAt: new Date,
  updatedAt: new Date
},
{
  userId: 19,
  roleId: 2,
  createdAt: new Date,
  updatedAt: new Date
},
{
  userId: 20,
  roleId: 4,
  createdAt: new Date,
  updatedAt: new Date
},
{
  userId: 21,
  roleId: 3,
  createdAt: new Date,
  updatedAt: new Date
},




      ])
      ])
    })
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkDelete('user_roles', null, {})
      ])
    })
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
