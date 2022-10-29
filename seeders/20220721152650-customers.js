'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('customers',[
          {
            id: 1,
            name: 'Jaybee',
            dpUrl: '',
            email: "jb@yahoo.com",
            address: "Tacloban City",
            isPaid: true,
            balance: 0,
            limit: 6000,
            starred: true
        },{
          id: 2,
          name: 'Mark Stevent',
          dpUrl: '',
          email: "mark@yahoo.com",
          address: "Peerless Village, Tacloban City",
          isPaid: true,
          balance: 0,
          limit: 10000,
          starred: true
      },{
        id: 3,
        name: 'Marty Pabello',
        dpUrl: '',
        email: 'mart@yahoo.com',
        address: "Tacloban City",
        isPaid: true,
        balance: 0,
        limit: 3000,
        starred: false
    },{
      id: 4,
      name: 'Brix Delute',
      dpUrl: '',
      email: 'brix@yahoo.com',
      address: "Green Dale, Tacloban City",
      isPaid: true,
      balance: 0,
      limit: 3000,
      starred: false
  },{
    id: 5,
    name: 'Reymel Aninano',
    dpUrl: '',
    email: 'rey@yahoo.com',
    address: "Tacloban City",
    isPaid: true,
    balance: 0,
    limit: 3000,
    starred: false
},{
  id: 6,
  name: 'Jerome Duenas',
  dpUrl: '',
  email: 'jer@yahoo.com',
  address: "Tacloban City",
  isPaid: true,
  balance: 0,
  limit: 3000,
  starred: false
},{
  id: 7,
  name: 'Jade Fernandez',
  dpUrl: '',
  email: 'jf23@yahoo.com',
  address: "Tacloban City",
  isPaid: true,
  balance: 0,
  limit: 3000,
  starred: false
},{
  id: 8,
  name: 'Sofia Andres',
  dpUrl: '',
  email: 'sa420@yahoo.com',
  address: "Tacloban City",
  isPaid: true,
  balance: 0,
  limit: 3000,
  starred: false
},{
  id: 9,
  name: 'Bernadette Solayman',
  dpUrl: '',
  email: 'bs420@yahoo.com',
  address: "Tacloban City",
  isPaid: true,
  balance: 0,
  limit: 3000,
  starred: false
},{
  id: 10,
  name: 'Vanessa Yao',
  dpUrl: '',
  email: 'vy42@yahoo.com',
  address: "Tacloban City",
  isPaid: true,
  balance: 0,
  limit: 3000,
  starred: false
},{
  id: 11,
  name: 'Zach Brayleigh Almaden',
  dpUrl: '',
  email: 'zb420@yahoo.com',
  address: "Tacloban City",
  isPaid: true,
  balance: 0,
  limit: 3000,
  starred: false
},{
  id: 12,
  name: 'Kiefer Fernandez',
  dpUrl: '',
  email: 'kiefer@yahoo.com',
  address: "Tacloban City",
  isPaid: true,
  balance: 0,
  limit: 3000,
  starred: false
},{
  id: 13,
  name: 'Christian De Guzman',
  dpUrl: '',
  email: 'cdg42@yahoo.com',
  address: "Tacloban City",
  isPaid: true,
  balance: 0,
  limit: 3000,
  starred: false
},{
  id: 14,
  name: 'HoneyJane Portillano',
  dpUrl: '',
  email: 'honeyp@yahoo.com',
  address: "Tacloban City",
  isPaid: true,
  balance: 0,
  limit: 3000,
  starred: false
},{
  id: 15,
  name: 'Harold Lopez',
  dpUrl: '',
  email: 'harold@yahoo.com',
  address: "Tacloban City",
  isPaid: true,
  balance: 0,
  limit: 3000,
  starred: false
},{
  id: 16,
  name: 'James Yondu',
  dpUrl: '',
  email: 'jy420230@yahoo.com',
  address: "Tacloban City",
  isPaid: true,
  balance: 0,
  limit: 3000,
  starred: false
},{
  id: 17,
  name: 'Abdul Salsalani Jacul',
  dpUrl: '',
  email: 'salsal@yahoo.com',
  address: "Tacloban City",
  isPaid: true,
  balance: 0,
  limit: 10000,
  starred: false
},{
  id: 18,
  name: 'Lana Rhodes Asuncion',
  dpUrl: '',
  email: 'lana@yahoo.com',
  address: "Tacloban City",
  isPaid: true,
  balance: 0,
  limit: 3000,
  starred: false
},{
  id: 19,
  name: 'Ivana Perez',
  dpUrl: '',
  email: 'ivana@yahoo.com',
  address: "Tacloban City",
  isPaid: true,
  balance: 0,
  limit: 3000,
  starred: false
},{
  id: 20,
  name: 'Harlene Loyola',
  dpUrl: '',
  email: 'harlene@yahoo.com',
  address: "Tacloban City",
  isPaid: true,
  balance: 0,
  limit: 3000,
  starred: false
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
        queryInterface.bulkDelete('customers', null, {})
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
