module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Officers', [{
      name: 'John Bikefinder',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Pavlo SuperCop",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "Mike Bike",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Officers', null, {});
  }
};
