module.exports = (sequelize, Sequelize) => {
	const Ingreso = sequelize.define('ingreso', {	
	id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	idCatedratico: {
			type: Sequelize.INTEGER
	},
	FechaHoraIngreso: {
			type: Sequelize.DATE
	},
    FechaHoraSalida: {
        type: Sequelize.DATE
    },
    Estatus: {
        type: Sequelize.BOOLEAN
    }
	});
	
	return Ingreso;
} 