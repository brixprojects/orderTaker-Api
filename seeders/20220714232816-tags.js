'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('tags',[
          {
            id: 1,
            name: 'Steels',
            slug: 'steels',
            color: "#FF8C00",
            type: "products"
        },{
          id: 2,
          name: 'Plastics',
          slug: 'plastics',
          color: "#00C4B4",
          type: "products"
      },{
        id: 3,
        name: 'Woods',
        slug: 'woods',
        color: "#00C400",
        type: "products"
    },
    {
      id: 4,
      name: 'Good Payers',
      slug: 'good payers',
      color: "#00C400",
      type: "customers"
  },{
    id: 5,
    name: 'VIP',
    slug: 'vip',
    color: "#00C4B4",
    type: "customers"
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
        queryInterface.bulkDelete('tags', null, {})
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
