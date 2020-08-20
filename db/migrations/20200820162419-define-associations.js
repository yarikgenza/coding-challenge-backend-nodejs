module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Cases',
      'officerId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Officers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Cases',
      'officerId'
    );
  }
};