module.exports = (sequelize, Sequelize) => {
    const Tarea = sequelize.define('tarea', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        titulo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        descripcion: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        completada: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        fecha_creacion: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        fecha_vencimiento: {
            type: Sequelize.DATE,
            allowNull: true
        },
        prioridad: {
            type: Sequelize.ENUM('baja', 'media', 'alta'),
            allowNull: false,
            defaultValue: 'media'
        },
        asignado_a: {
            type: Sequelize.STRING,
            allowNull: true
        },
        categoria: {
            type: Sequelize.STRING,
            allowNull: true
        },
        costo_proyecto: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        pagado: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        metodo_pago: {
            type: Sequelize.STRING,
            allowNull: true
        },
        fecha_pago: {
            type: Sequelize.DATE,
            allowNull: true
        }
    });

    return Tarea;
};
