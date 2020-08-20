module.exports = (sequelize, DataTypes) => {
  const Officer = sequelize.define('Officer', {
    name: DataTypes.STRING,
  }, {});
  Officer.associate = function(models) {
    Officer.hasOne(models.Case, {
        foreignKey: 'officerId',
    });
  };
  return Officer;
};