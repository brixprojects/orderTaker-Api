'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.bulkInsert('products',[
          {
            id: 1,
            name: 'Hammer',
            description: "Mikata Hammer yellow",
            price: 100,
            stocks: 100,
            limit: 50,
            uom: 'piece',
            businessId: 1,
            starred: true
        },{
          id: 2,
          name: ' Nails - 14"',
          description: "common nail",
          businessId: 1,
          uom: 'kilo',
          price: 120,
          stocks: 80,
          limit: 20,
          starred: false
      },{
        id: 3,
        name: 'Screw',
        description: "Concrete Screw",
        uom: 'kilo',
        businessId: 1,
        price: 180,
        stocks: 120,
        limit: 40,
        starred: false
      },{
        id: 4,
        name: 'STEEL',
        description: "Steel Bar",
        uom: 'piece',
        businessId: 1,
        price: 300,
        stocks: 170,
        limit: 50,
        starred: false
      },{
        id: 5,
        name: 'PAINTS',
        description: "Red Boysen Paint",
        uom: 'gallon',
        businessId: 1,
        price: 600,
        stocks: 100,
        limit: 30,
        starred: false
      },{
        id: 6,
        name: 'PVC FITTINGS',
        description: " Elbow PVC  FITTINGS",
        uom: 'piece',
        businessId: 1,
        price: 400,
        stocks: 180,
        limit: 60,
        starred: false
      },{
        id: 7,
        name: 'FLASHING',
        description: " Wall FLASHING",
        uom: 'piece',
        businessId: 1,
        price: 900,
        stocks: 150,
        limit: 50,
        starred: false
      },{
        id: 8,
        name: 'LOCKS',
        description: "DOOR CLOSE LOCK",
        uom: 'piece',
        businessId: 1,
        price: 2000,
        stocks: 200,
        limit: 100,
        starred: false
      },{
        id: 9,
        name: 'HEAD SCREW',
        description: "HEXAGON HEAD SCREW",
        uom: 'kilo',
        businessId: 1,
        price: 340,
        stocks: 100,
        limit: 30,
        starred: false
      },{
        id: 10,
        name: 'RIVET',
        description: "POP RIVET",
        uom: 'piece',
        businessId: 1,
        price: 500,
        stocks: 120,
        limit: 50,
        starred: false
      },{
        id: 11,
        name: 'STEEL BAR',
        description: "Steel Bar 14inch",
        uom: 'piece',
        businessId: 1,
        price: 420,
        stocks: 90,
        limit: 40,
        starred: false
      },{
        id: 12,
        name: 'CERAMIC ITEMS',
        description: "Ceramic roof tiles",
        uom: 'piece',
        businessId: 1,
        price: 600,
        stocks: 200,
        limit: 50,
        starred: false
      },{
        id: 13,
        name: 'HAND TRUCK TROLLEY',
        description: "Folding push cart",
        uom: 'piece',
        businessId: 1,
        price: 1200,
        stocks: 400,
        limit: 80,
        starred: false
      },{
        id: 14,
        name: 'HAMMER',
        description: "Wooden Handle Hammer",
        uom: 'piece',
        businessId: 1,
        price: 900,
        stocks: 200,
        limit: 65,
        starred: false
      },{
        id: 15,
        name: 'CUTTER KNIFE',
        description: " Yellow CUTTER KNIFE",
        uom: 'piece',
        businessId: 1,
        price: 90,
        stocks:80,
        limit: 45,
        starred: false
      },{
        id: 16,
        name: 'SAW BLADE',
        description: "Dewalt Circular SAW BLADE",
        uom: 'piece',
        businessId: 1,
        price: 200,
        stocks: 500,
        limit: 30,
        starred: false
      },{
        id: 17,
        name: 'HACKSAW BLADE',
        description: " Eclipse Power HACKSAW BLADE",
        uom: 'piece',
        businessId: 1,
        price: 400,
        stocks: 130,
        limit: 30,
        starred: false
      },{
        id: 18,
        name: 'HAND RIVATOR',
        description: " Stanley HAND RIVATOR",
        uom: 'piece',
        businessId: 1,
        price: 860,
        stocks: 80,
        limit: 20,
        starred: false
      },{
        id: 19,
        name: 'HAND WASH BASIN',
        description: "Ceramic HAND BASIN",
        uom: 'piece',
        businessId: 1,
        price: 780,
        stocks: 50,
        limit: 10,
        starred: false
      },{
        id: 20,
        name: 'VELCRO BACKING DISC',
        description: "VELCRO BACKING DISC FOR GRINDING",
        uom: 'piece',
        businessId: 1,
        price: 780,
        stocks: 135,
        limit: 30,
        starred: false
      },{
        id: 21,
        name: 'WIRE BRUSH',
        description: "STAINLESS STEEL WIRE BRUSH",
        uom: 'piece',
        businessId: 1,
        price: 280,
        stocks: 90,
        limit: 20,
        starred: false
      },{
        id: 22,
        name: 'KNIFE',
        description: "VARDAGEN PARING KNIFE",
        uom: 'piece',
        businessId: 1,
        price: 420,
        stocks: 110,
        limit: 10,
        starred: false
      },{
        id: 23,
        name: 'PVC SOLVENT CEMENT',
        description: " POINEER PVC SOLVENT CEMENT",
        uom: 'piece',
        businessId: 1,
        price: 370,
        stocks: 150,
        limit: 40,
        starred: false
      },{
        id: 24,
        name: 'FILTERS',
        description: "RS PRO FAN FILTER",
        uom: 'piece',
        businessId: 1,
        price: 800,
        stocks: 190,
        limit: 20,
        starred: false
      },{
        id: 25,
        name: 'VALVES',
        description:  " BUTTERFLY VALVES",
        uom: 'piece',
        businessId: 1,
        price: 320,
        stocks: 120,
        limit: 20,
        starred: false
      },{
        id: 26,
        name: 'DOOR BELL',
        description: "OMNI WEATHERPROOF DOOR BELL",
        uom: 'piece',
        businessId: 1,
        price: 650,
        stocks: 200,
        limit: 30,
        starred: false
      },{
        id: 27,
        name: 'TUBES',
        description: " STAINLESS STEEL TUBING",
        uom: 'piece',
        businessId: 1,
        price: 400,
        stocks: 120,
        limit: 35,
        starred: false
      },{
        id: 28,
        name: 'TROPIK WOOD',
        description: "TROPIK PINE FLOORING",
        uom: 'piece',
        businessId: 1,
        price: 1250,
        stocks: 160,
        limit: 15,
        starred: false
      },{
        id: 29,
        name: 'TUBES',
        description: "COMPOSITE TUBES",
        uom: 'piece',
        businessId: 1,
        price: 500,
        stocks: 200,
        limit: 40,
        starred: false
      },{
        id: 30,
        name: 'PUMP PARTS',
        description: "Valute PARTS",
        uom: 'piece',
        businessId: 1,
        price: 170,
        stocks: 90,
        limit: 15,
        starred: false
      },{
        id: 31,
        name: 'BRUSH CUTTER',
        description: " GASOLINE BRUSH CUTTER",
        uom: 'piece',
        businessId: 1,
        price: 1000,
        stocks: 80,
        limit: 10,
        starred: false
      },{
        id: 32,
        name: 'LIGHT BULB',
        description: "FIREFLY LIGHTBULB",
        uom: 'piece',
        businessId: 1,
        price: 500,
        stocks: 350,
        limit: 40,
        starred: false
      },{
        id: 33,
        name: 'TOILET SEAT',
        description: " GROU BEU TOILET SEAT",
        uom: 'piece',
        businessId: 1,
        price: 900,
        stocks: 200,
        limit: 30,
        starred: false
      },{
        id: 34,
        name: 'PAINT BRUSH',
        description: " MALA PAINT BRUSH",
        uom: 'piece',
        businessId: 1,
        price: 350,
        stocks: 320,
        limit: 40,
        starred: false
      },{
        id: 35,
        name: 'TANK FITTINGS',
        description: "MECO UNIVERSAL TANK FITTINGS",
        uom: 'piece',
        businessId: 1,
        price: 430,
        stocks: 300,
        limit: 50,
        starred: false
      },{
        id: 36,
        name: 'METAL GRIP',
        description: "METAL FLOOR GRIP",
        uom: 'piece',
        businessId: 1,
        price: 400,
        stocks: 100,
        limit: 20,
        starred: false
      },{
        id: 37,
        name: 'PLIERS',
        description: " STANLEY LINEMAN PLIERS",
        uom: 'piece',
        businessId: 1,
        price: 220,
        stocks: 190,
        limit: 40,
        starred: false
      },{
        id: 38,
        name: 'HOSE PIPE',
        description: " GARDEN HOSE PIPE",
        uom: 'meter',
        businessId: 1,
        price: 400,
        stocks: 80,
        limit: 10,
        starred: false
      },{
        id: 39,
        name: 'PVC PIPE',
        description: " CHARLOTTE PVC PIPE",
        uom: 'piece',
        businessId: 1,
        price: 600,
        stocks: 450,
        limit: 80,
        starred: false
      },{
        id: 40,
        name: 'ALLEN WRENCH',
        description: " STANLEY ALLEN WRENCH",
        uom: 'piece',
        businessId: 1,
        price: 250,
        stocks: 240,
        limit: 20,
        starred: false
      },{
        id: 41,
        name: 'SCREW DRIVER',
        description: " STANLEY CUSHION GRIP FLAT SCREW DRIVER",
        uom: 'piece',
        businessId: 1,
        price: 200,
        stocks: 100,
        limit: 20,
        starred: false
      },{
        id: 42,
        name: 'STEEL BIT',
        description: "DRILL BIT",
        uom: 'piece',
        businessId: 1,
        price: 400,
        stocks: 120,
        limit: 40,
        starred: false
      },{
        id: 43,
        name: 'FLAT FILE',
        description: " ORIGINAL NICOLSON FLAT FILE",
        uom: 'piece',
        businessId: 1,
        price: 400,
        stocks: 200,
        limit: 30,
        starred: false
      },{
        id: 44,
        name: 'PVC BALL VALVE',
        description: " GLUE END PVC BALL VALVE",
        uom: 'piece',
        businessId: 1,
        price: 300,
        stocks: 120,
        limit: 10,
        starred: false
      },{
        id: 45,
        name: 'BOLT',
        description: "PLAIN  STEEL  HEX BOLT",
        uom: 'piece',
        businessId: 1,
        price: 300,
        stocks: 1000,
        limit: 100,
        starred: false
      },{
        id: 46,
        name: 'SILICONE CLEAR',
        description: " ABC SILICONE CLEAR",
        uom: 'piece',
        businessId: 1,
        price: 350,
        stocks: 50,
        limit: 10,
        starred: false
      },{
        id: 47,
        name: 'CEMENT',
        description: " GRAND PORTLAND CEMENT",
        uom: 'sack',
        businessId: 1,
        price: 520,
        stocks: 100,
        limit: 20,
        starred: false
      },{
        id: 48,
        name: 'PLYWOOD',
        description: " MARINE PLYWOOD",
        uom: 'piece',
        businessId: 1,
        price: 900,
        stocks: 200,
        limit: 50,
        starred: false
      },{
        id: 49,
        name: 'BLOCKS',
        description: " CONCRETE BLOCKS",
        uom: 'piece',
        businessId: 1,
        price: 120,
        stocks: 200,
        limit: 30,
        starred: false
      },{
        id: 50,
        name: 'ALLEN KEY',
        description: " STANLEY ALLEN KEY",
        uom: 'piece',
        businessId: 1,
        price: 200,
        stocks: 220,
        limit: 30,
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
        queryInterface.bulkDelete('products', null, {})
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
