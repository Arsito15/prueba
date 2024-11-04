module.exports = (sequelize, Sequelize) => {
	const Horario = sequelize.define('horario', {	
	id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	idCatedratico: {
			type: Sequelize.INTEGER
	},
	Curso: {
			type: Sequelize.STRING
  	},
	HoraInicio: {
			type: Sequelize.FLOAT
	},
    HoraFin: {
        type: Sequelize.FLOAT
    },
	});
	
	return Horario;
} 