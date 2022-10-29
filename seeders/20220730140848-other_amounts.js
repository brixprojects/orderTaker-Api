'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('other_amounts',[
          {
            id: 1,
            name: 'VAT',
            type: 'tax',
            amount_type: 'rate',
            value: 12
        },
        {
          id: 2,
          name: 'Discount',
          type: 'discounts',
          amount_type: 'rate',
          value: 5
      },
      {
        id: 3,
        name: 'Other Charges',
        type: 'charges',
        amount_type: 'amount',
        value: 100
    }
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
        queryInterface.bulkDelete('other_amounts', null, {})
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
