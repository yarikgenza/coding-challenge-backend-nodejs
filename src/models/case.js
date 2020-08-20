module.exports = (sequelize, DataTypes) => {
  const Case = sequelize.define('Case', {
    reporter: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(['PENDING', 'ASSIGNED', 'RESOLVED']),
      defaultValue: 'PENDING',
      allowNull: false,
    },
  }, {});
  Case.associate = function(models) {
    Case.belongsTo(models.Officer, {
      foreignKey: 'officerId',
    });
  };
  return Case;
};