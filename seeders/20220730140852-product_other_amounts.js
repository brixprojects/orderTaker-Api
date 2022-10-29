'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('product_other_amounts',[
        {
            productId: 1,
            other_amountId: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },{
        productId: 1,
        other_amountId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        productId: 1,
        other_amountId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }])
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
        queryInterface.bulkDelete('product_other_amounts', null, {})
      ])
    });
    
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
