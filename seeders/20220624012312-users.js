'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('users',[
          {
            id: 1,
            name: 'aja',
            email: "aja@mail.com",
            address: "Villaba Leyte",
            password: "$2a$08$NDLw0iM5y7MQVIQpACz7oubxBQFCUXEQ1nDtvWDdqyFtaQRMXZ.LK",
            businessId: 1
        },


        {
          id: 2,
          name: 'James Lebron',
          email: "jb@mail.com",
          address: "Los Angles V&G Sub Tacloban City",
          password: "$2a$08$NDLw0iM5y7MQVIQpACz7oubxBQFCUXEQ1nDtvWDdqyFtaQRMXZ.LK",
          businessId: 1
      },

      {
        id: 3,
        name: 'Anthony Davis',
        email: "Ad03@mail.com",
        address: "New York street V&G Sub Tacloban City",
        password: "$2a$08$NDLw0iM5y7MQVIQpACz7oubxBQFCUXEQ1nDtvWDdqyFtaQRMXZ.LK",
        businessId: 1
    },

    {
      id: 4,
      name: 'Patrick Beverly',
      email: "patB00@mail.com",
      address: "Houston Street V&G Sub Tacloban City",
      password: "$2a$08$NDLw0iM5y7MQVIQpACz7oubxBQFCUXEQ1nDtvWDdqyFtaQRMXZ.LK",
      businessId: 1
  },

  {
    id: 5,
    name: 'Russell WestBrook',
    email: "RussB@mail.com",
    address: "Atlanta Street V&G Sub Tacloban City",
    password: "$2a$08$NDLw0iM5y7MQVIQpACz7oubxBQFCUXEQ1nDtvWDdqyFtaQRMXZ.LK",
    businessId: 1
},

{
  id: 6,
  name: 'Dwight Howard',
  email: "D12@mail.com",
  address: "Florida Street V&G Sub Tacloban City",
  password: "$2a$08$NDLw0iM5y7MQVIQpACz7oubxBQFCUXEQ1nDtvWDdqyFtaQRMXZ.LK",
  businessId: 1
},

{
  id: 7,
  name: 'Pau Gasol',
  email: "paupau@mail.com",
  address: "Spain Street V&G Street Sub Tacloban City",
  password: "$2a$08$NDLw0iM5y7MQVIQpACz7oubxBQFCUXEQ1nDtvWDdqyFtaQRMXZ.LK",
  businessId: 1
},

{
  id: 8,
  name: 'Kobe Bryant',
  email: "Kb824@mail.com",
  address: "Toronto Street V&G Sub Tacloban City",
  password: "$2a$08$NDLw0iM5y7MQVIQpACz7oubxBQFCUXEQ1nDtvWDdqyFtaQRMXZ.LK",
  businessId: 1
},

{
  id: 9,
  name: 'Direk Fisher',
  email: "F02@mail.com",
  address: "Palo Leyte",
  password: "$2a$08$NDLw0iM5y7MQVIQpACz7oubxBQFCUXEQ1nDtvWDdqyFtaQRMXZ.LK",
  businessId: 1
},

{
  id: 10,
  name: 'Alex Carusso',
  email: "Carushow@mail.com",
  address: "Lapaz Leyte",
  password: "$2a$08$NDLw0iM5y7MQVIQpACz7oubxBQFCUXEQ1nDtvWDdqyFtaQRMXZ.LK",
  businessId: 1
},

{
  id: 11,
  name: 'Jared Dudley',
  email: "swipe7@mail.com",
  address: "Tolosa Leyte",
  password: "$2a$08$NDLw0iM5y7MQVIQpACz7oubxBQFCUXEQ1nDtvWDdqyFtaQRMXZ.LK",
  businessId: 1
},

{
  id: 12,
  name: 'Robert Bollick',
  email: "Tober07@mail.com",
  address: "Apitong Tacloban City",
  password: "$2a$08$NDLw0iM5y7MQVIQpACz7oubxBQFCUXEQ1nDtvWDdqyFtaQRMXZ.LK",
  businessId: 1
},

{
  id: 13,
  name: 'Jhune Mar Fajardo',
  email: "JMF12@mail.com",
  address: "Campetic Palo Leyte",
  password: "$2a$08$NDLw0iM5y7MQVIQpACz7oubxBQFCUXEQ1nDtvWDdqyFtaQRMXZ.LK",
  businessId: 1
},

{
  id: 14,
  name: 'Asi Taulava',
  email: "swipe07@mail.com",
  address: "Palo Leyte",
  password: "$2a$08$NDLw0iM5y7MQVIQpACz7oubxBQFCUXEQ1nDtvWDdqyFtaQRMXZ.LK",
  businessId: 1
},

{
  id: 15,
  name: 'Jimmiy Alapag',
  email: "mighty03@mail.com",
  address: "Tanuan Leyte",
  password: "$2a$08$NDLw0iM5y7MQVIQpACz7oubxBQFCUXEQ1nDtvWDdqyFtaQRMXZ.LK",
  businessId: 1
},

{
  id: 16,
  name: 'Cyrus Bagui',
  email: "skyrus07@mail.com",
  address: "Tolosa Leyte",
  password: "$2a$08$NDLw0iM5y7MQVIQpACz7oubxBQFCUXEQ1nDtvWDdqyFtaQRMXZ.LK",
  businessId: 1
},

{
  id: 17,
  name: 'James Yao',
  email: "Bigshot07@mail.com",
  address: "Dulag Leyte",
  password: "$2a$08$NDLw0iM5y7MQVIQpACz7oubxBQFCUXEQ1nDtvWDdqyFtaQRMXZ.LK",
  businessId: 1
},

{
  id: 18,
  name: 'Ranny Del de Ocampo',
  email: "swipe07@mail.com",
  address: "Mayorga Leyte",
  password: "$2a$08$NDLw0iM5y7MQVIQpACz7oubxBQFCUXEQ1nDtvWDdqyFtaQRMXZ.LK",
  businessId: 1
},

{
  id: 19,
  name: 'Beu Belga',
  email: "B00@mail.com",
  address: "Lapaz Leyte",
  password: "$2a$08$NDLw0iM5y7MQVIQpACz7oubxBQFCUXEQ1nDtvWDdqyFtaQRMXZ.LK",
  businessId: 1
},

{
  id: 20,
  name: 'Yeng Yao',
  email: "yaowe07@mail.com",
  address: "Mc Arthur Leyte",
  password: "$2a$08$NDLw0iM5y7MQVIQpACz7oubxBQFCUXEQ1nDtvWDdqyFtaQRMXZ.LK",
  businessId: 1
},

{
  id: 21,
  name: 'Tim Cone',
  email: "Con234@mail.com",
  address: "Lapaz Leyte",
  password: "$2a$08$NDLw0iM5y7MQVIQpACz7oubxBQFCUXEQ1nDtvWDdqyFtaQRMXZ.LK",
  businessId: 1
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
        queryInterface.bulkDelete('users', null, {})
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
