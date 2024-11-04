module.exports = (sequelize, Sequelize) => {
	const Employee = sequelize.define('employee', {	
	  id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  nombre: {
			type: Sequelize.STRING
	  },
	  nit: {
			type: Sequelize.INTEGER
  	},
	  address: {
			type: Sequelize.STRING
	  },
	  telefono: {
			type: Sequelize.INTEGER
    }
	});
	
	return Employee;
} 