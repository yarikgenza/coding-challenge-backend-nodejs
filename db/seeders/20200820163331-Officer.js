module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Cases', [{
      reportedBy: "Yarik Henza",
      description: "My bike was stolen at [location, .etc..]",
      officerId: 2,
      status: 'ASSIGNED',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cases', null, {});
  }
};
