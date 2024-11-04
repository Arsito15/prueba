module.exports = (sequelize, Sequelize) => {
    const Branch = sequelize.define('branch', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      copyrightby: {
        type: Sequelize.STRING,
        defaultValue: 'UMG Antigua'
      }
    });
  
    return Branch;
  };
  