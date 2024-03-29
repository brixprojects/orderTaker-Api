'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('roles',[
          {
            id: 1,
            name: 'super',
            note: 'Super Account'
        },
        {
          id: 2,
          name: 'admin',
          note: 'Admin Account'
        },
        {
          id: 3,
          name: 'sales',
          note: 'Sales Account'
        },{
        id: 4,
        name: 'user',
        note: 'User Account'
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
        queryInterface.bulkDelete('roles', null, {})
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
