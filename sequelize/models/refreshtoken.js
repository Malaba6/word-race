module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define(
    'RefreshToken',
    {
      token: DataTypes.STRING,
      expiresat:  DataTypes.DATE,
      ownerId: DataTypes.INTEGER,
      isRevoked: DataTypes.BOOLEAN
    }, {
      timestamps: false
    }
  );
  RefreshToken.associate = (models) => {
    RefreshToken.belongsTo(models.user,
      {as: 'owner', foreignKey: 'ownerId', onDelete: 'CASCADE'});
  };
  return RefreshToken;
};