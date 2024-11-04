const db = require('../config/db.config.js');
const Prestamo = db.Prestamo;

exports.create = (req, res) => {
    let prestamo = {};

    try {
        // Building Prestamo object from uploading request's body
        prestamo.id_libro = req.body.id_libro;
        prestamo.id_usuario = req.body.id_usuario;
        prestamo.fecha_salida = req.body.fecha_salida;
        prestamo.fecha_max = req.body.fecha_max;
        prestamo.fecha_devolucion = req.body.fecha_devolucion;

        // Save to MySQL database
        Prestamo.create(prestamo).then(result => {
            // Send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a Prestamo with id = " + result.id,
                prestamo: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllPrestamos = (req, res) => {
    // Find all Prestamo information
    Prestamo.findAll()
        .then(prestamoInfos => {
            res.status(200).json({
                message: "Get all Prestamos' Infos Successfully!",
                prestamoes: prestamoInfos
            });
        })
        .catch(error => {
            // Log on console
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.getPrestamoById = (req, res) => {
    // Find Prestamo information by ID
    let prestamoId = req.params.id;
    Prestamo.findByPk(prestamoId)
        .then(prestamo => {
            res.status(200).json({
                message: "Successfully Get a Prestamo with id = " + prestamoId,
                prestamo: prestamo
            });
        })
        .catch(error => {
            // Log on console
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}


exports.updateById = async (req, res) => {
    try {
        let prestamoId = req.params.id;
        let prestamo = await Prestamo.findByPk(prestamoId);

        if (!prestamo) {
            // Return a response to client
            res.status(404).json({
                message: "Not Found for updating a prestamo with id = " + prestamoId,
                prestamo: "",
                error: "404"
            });
        } else {
            // Update new change to database
            let updatedObject = {
                id_libro: req.body.id_libro,
                id_usuario: req.body.id_usuario,
                fecha_salida: req.body.fecha_salida,
                fecha_max: req.body.fecha_max,
                fecha_devolucion: req.body.fecha_devolucion
            }
            let result = await Prestamo.update(updatedObject, { returning: true, where: { id: prestamoId } });

            // Return the response to client
            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a prestamo with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Prestamo with id = " + prestamoId,
                prestamo: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a prestamo with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let prestamoId = req.params.id;
        let prestamo = await Prestamo.findByPk(prestamoId);

        if (!prestamo) {
            res.status(404).json({
                message: "Does Not exist a Prestamo with id = " + prestamoId,
                error: "404",
            });
        } else {
            await prestamo.destroy();
            res.status(200).json({
                message: "Delete Successfully a Prestamo with id = " + prestamoId,
                prestamo: prestamo,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a prestamo with id = " + req.params.id,
            error: error.message,
        });
    }
}

