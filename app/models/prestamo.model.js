module.exports = (sequelize, Sequelize) => {
    const PrestamoLibro = sequelize.define('prestamo_libro', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      id_libro: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      fecha_salida: {
        type: Sequelize.DATE,
        allowNull: false
      },
      fecha_max: {
        type: Sequelize.DATE,
        allowNull: false
      },
      fecha_devolucion: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  
    return PrestamoLibro;
  };
  