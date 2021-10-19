module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', 
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      verified: DataTypes.BOOLEAN,
      image: DataTypes.STRING
    }, {
      timestamps: true
    })
  
  user.associate = (models) => {
    user.hasMany(models.RefreshToken,
      {as: 'owner', foreignKey: 'ownerId', onDelete: 'CASCADE'})
  }
  return user
};