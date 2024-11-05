
let express = require('express');
let router = express.Router();
 
const customers = require('../controllers/controller.js');
const employee = require('../controllers/controller.employee.js');
const product = require('../controllers/controller.product.js');
const branch = require('../controllers/controller.branch.js');
const book = require('../controllers/controller.book.js');
const prestamo = require('../controllers/controller.prestamo.js');
const catedratico = require('../controllers/controller.catedratico.js');
const horario = require('../controllers/controller.horario.js');
const ingreso = require('../controllers/controller.ingreso.js');
const tarea = require('../controllers/controller.tarea.js');
const usuario = require('../controllers/controller.usuario.js');
const pago = require('../controllers/controller.pago.js');

router.post('/api/catedratico/create', catedratico.create);
router.get('/api/catedratico/all', catedratico.retrieveAllCatedraticos);
router.get('/api/catedratico/onebyid/:id', catedratico.getCatedraticoById);
router.put('/api/catedratico/update/:id', catedratico.updateById);
router.delete('/api/catedratico/delete/:id', catedratico.deleteById);

router.post('/api/horario/create', horario.create);
router.get('/api/horario/all', horario.retrieveAllHorarios);
router.get('/api/horario/onebyid/:id', horario.getHorarioById);
router.put('/api/horario/update/:id', horario.updateById);
router.delete('/api/horario/delete/:id', horario.deleteById);

router.post('/api/ingreso/create', ingreso.create);
router.get('/api/ingreso/all', ingreso.retrieveAllIngresos);
router.get('/api/ingreso/onebyid/:id', ingreso.getIngresoById);
router.put('/api/ingreso/update/:id', ingreso.updateById);
router.delete('/api/ingreso/delete/:id', ingreso.deleteById);

router.post('/api/customers/create', customers.create);
router.get('/api/customers/all', customers.retrieveAllCustomers);
router.get('/api/customers/onebyid/:id', customers.getCustomerById);
router.get('/api/customers/filteringbyage', customers.filteringByAge);
router.get('/api/customers/pagination', customers.pagination);
router.get('/api/customers/pagefiltersort', customers.pagingfilteringsorting);
router.put('/api/customers/update/:id', customers.updateById);
router.delete('/api/customers/delete/:id', customers.deleteById);

router.post('/api/employee', employee.create);
router.get('/api/employee', employee.retrieveAllEmployees);
router.get('/api/employee/onebyid/:id', employee.getEmployeeById);
router.get('/api/employee/filteringbyage', employee.filteringByAge);
router.get('/api/employee/pagination', employee.pagination);
router.get('/api/employee/pagefiltersort', employee.pagingfilteringsorting);
router.put('/api/employee/:id', employee.updateById);
router.delete('/api/employee/:id', employee.deleteById);

router.post('/api/product/create', product.create);
router.get('/api/product/all', product.retrieveAllProducts);
router.get('/api/product/onebyid/:id', product.getProductById);
router.get('/api/product/filteringbyprice', product.filteringByPrice);
router.get('/api/product/pagination', product.pagination);
router.get('/api/product/pagefiltersort', product.pagingfilteringsorting);
router.put('/api/product/update/:id', product.updateById);
router.delete('/api/product/delete/:id', product.deleteById);

router.post('/api/branch/create', branch.create);
router.get('/api/branch/all', branch.retrieveAllBranches);
router.get('/api/branch/onebyid/:id', branch.getBranchById);
router.get('/api/branch/pagination', branch.pagination);
router.put('/api/branch/update/:id', branch.updateById);
router.delete('/api/branch/delete/:id', branch.deleteById);

router.post('/api/book/create', book.create);
router.get('/api/book/all', book.retrieveAllBooks);
router.get('/api/book/onebyid/:id', book.getBookById);
router.put('/api/book/update/:id', book.updateById);
router.delete('/api/book/delete/:id', book.deleteById);

router.post('/api/prestamos/create', prestamo.create);
router.get('/api/prestamos/all', prestamo.retrieveAllPrestamos);
router.get('/api/prestamos/onebyid/:id', prestamo.getPrestamoById);
router.put('/api/prestamos/update/:id', prestamo.updateById);
router.delete('/api/prestamos/delete/:id', prestamo.deleteById);

//3er parcial

// Rutas para Tareas
router.post('/api/tareas/create', tarea.create);
router.get('/api/tareas/all', tarea.retrieveAllTareas);
router.get('/api/tareas/onebyid/:id', tarea.getTareaById);
router.put('/api/tareas/update/:id', tarea.updateById);
router.delete('/api/tareas/delete/:id', tarea.deleteById);

// Rutas para Usuarios
router.post('/api/usuarios/create', usuario.create);
router.get('/api/usuarios/all', usuario.retrieveAllUsuarios);
router.get('/api/usuarios/onebyid/:id', usuario.getUsuarioById);
router.put('/api/usuarios/update/:id', usuario.updateById);
router.delete('/api/usuarios/delete/:id', usuario.deleteById);

// Rutas para Pagos
router.post('/api/pagos/create', pago.create);
router.get('/api/pagos/all', pago.retrieveAllPagos);
router.get('/api/pagos/onebyid/:id', pago.getPagoById);
router.put('/api/pagos/update/:id', pago.updateById);
router.delete('/api/pagos/delete/:id', pago.deleteById);

module.exports = router;