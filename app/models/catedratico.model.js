module.exports = (sequelize, Sequelize) => {
	const Catedratico = sequelize.define('catedratico', {	
	id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	Nombre: {
			type: Sequelize.STRING
	},
	FechaContratacion: {
			type: Sequelize.DATE
  	},
	FechaNacimiento: {
			type: Sequelize.DATE
	},
	Genero: {
			type: Sequelize.STRING
    },
    Titulo: {
        type: Sequelize.STRING
    },
    Salario: {
        type: Sequelize.INTEGER
    }
	});
	
	return Catedratico;
} 