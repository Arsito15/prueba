module.exports = (sequelize, Sequelize) => {
    const Pago = sequelize.define('pago', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tarea_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'tareas',
                key: 'id'
            }
        },
        usuario_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'usuarios',
                key: 'id'
            }
        },
        metodo_pago: {
            type: Sequelize.STRING,
            allowNull: false
        },
        monto: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        fecha_pago: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        estado: {
            type: Sequelize.ENUM('pendiente', 'completado', 'fallido'),
            allowNull: false,
            defaultValue: 'pendiente'
        }
    });

    return Pago;
};
