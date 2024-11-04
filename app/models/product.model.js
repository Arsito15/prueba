module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('product', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      copyrightby: {
        type: Sequelize.STRING,
        defaultValue: 'UMG Antigua'
      }
    });
  
    return Product;
  };