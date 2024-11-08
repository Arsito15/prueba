const db = require('../config/db.config.js');
const Pago = db.Pago;

// Crear un nuevo pago en la base de datos
exports.create = async (req, res) => {
    try {
        // Información del pago desde el cuerpo de la solicitud
        const { tarea_id, usuario_id, metodo_pago, monto } = req.body;

        // Guardar el pago en la base de datos
        const pago = await Pago.create({
            tarea_id: tarea_id,
            usuario_id: usuario_id,
            metodo_pago: metodo_pago,
            monto: monto,
            estado: 'pendiente',  // Estado inicial del pago
            fecha_pago: new Date()
        });

        res.status(200).json({
            message: "Pago creado con éxito",
            pago: pago
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el pago!",
            error: error.message
        });
    }
};

// Obtener todos los pagos
exports.retrieveAllPagos = (req, res) => {
    Pago.findAll()
        .then(pagos => {
            res.status(200).json({
                message: "Todos los pagos obtenidos con éxito!",
                pagos: pagos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener los pagos!",
                error: error
            });
        });
};

// Obtener un pago por ID
exports.getPagoById = (req, res) => {
    let pagoId = req.params.id;
    Pago.findByPk(pagoId)
        .then(pago => {
            if (pago) {
                res.status(200).json({
                    message: "Pago obtenido con éxito, id = " + pagoId,
                    pago: pago
                });
            } else {
                res.status(404).json({
                    message: "No se encontró el pago con id = " + pagoId,
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al obtener el pago!",
                error: error
            });
        });
};

// Actualizar un pago por ID
exports.updateById = async (req, res) => {
    try {
        let pagoId = req.params.id;
        let pago = await Pago.findByPk(pagoId);

        if (!pago) {
            res.status(404).json({
                message: "No se encontró el pago para actualizar con id = " + pagoId,
                pago: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                tarea_id: req.body.tarea_id,
                usuario_id: req.body.usuario_id,
                metodo_pago: req.body.metodo_pago,
                monto: req.body.monto,
                estado: req.body.estado,
                fecha_pago: req.body.fecha_pago
            };

            let result = await Pago.update(updatedObject, { returning: true, where: { id: pagoId } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar el pago con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Pago actualizado con éxito, id = " + pagoId,
                pago: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el pago con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar un pago por ID
exports.deleteById = async (req, res) => {
    try {
        let pagoId = req.params.id;
        let pago = await Pago.findByPk(pagoId);

        if (!pago) {
            res.status(404).json({
                message: "No existe un pago con id = " + pagoId,
                error: "404",
            });
        } else {
            await pago.destroy();
            res.status(200).json({
                message: "Pago eliminado con éxito, id = " + pagoId,
                pago: pago,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el pago con id = " + req.params.id,
            error: error.message,
        });
    }
};
