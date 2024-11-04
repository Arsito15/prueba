module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define('book', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      editorial: {
        type: Sequelize.STRING,
        allowNull: false
      },
      autor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      genero: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pais: {
        type: Sequelize.STRING,
        allowNull: false
      },
      paginas: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      anio: {
        type: Sequelize.DATE,
        allowNull: false
      },
      precio: {
        type: Sequelize.FLOAT,
        allowNull: false
      }
    });
  
    return Book;
  };