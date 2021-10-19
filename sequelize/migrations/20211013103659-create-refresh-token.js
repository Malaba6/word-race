/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RefreshTokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      token: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      expiresat: {
        type: Sequelize.DATE,
        allowNull: false
      },
      isRevoked: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      ownerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('RefreshTokens');
  }
};