const db = require('../config/db.config.js');
const Tarea = db.Tarea;

// Crear una nueva tarea
exports.create = (req, res) => {
    let tarea = {};

    try {
        // Construir el objeto Tarea desde el cuerpo de la solicitud
        tarea.titulo = req.body.titulo;
        tarea.descripcion = req.body.descripcion;
        tarea.completada = req.body.completada || false;
        tarea.fecha_vencimiento = req.body.fecha_vencimiento;
        tarea.prioridad = req.body.prioridad || 'media';
        tarea.asignado_a = req.body.asignado_a;
        tarea.categoria = req.body.categoria;
        tarea.costo_proyecto = req.body.costo_proyecto;
        tarea.pagado = req.body.pagado || false;
        tarea.metodo_pago = req.body.metodo_pago;
        tarea.fecha_pago = req.body.fecha_pago;

        // Guardar en la base de datos
        Tarea.create(tarea).then(result => {
            res.status(200).json({
                message: "Tarea creada con éxito, id = " + result.id,
                tarea: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear la tarea!",
            error: error.message
        });
    }
};

// Obtener todas las tareas
exports.retrieveAllTareas = (req, res) => {
    Tarea.findAll()
        .then(tareas => {
            res.status(200).json({
                message: "Todas las tareas obtenidas con éxito!",
                tareas: tareas
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener las tareas!",
                error: error
            });
        });
};

// Obtener una tarea por ID
exports.getTareaById = (req, res) => {
    let tareaId = req.params.id;
    Tarea.findByPk(tareaId)
        .then(tarea => {
            if (tarea) {
                res.status(200).json({
                    message: "Tarea obtenida con éxito, id = " + tareaId,
                    tarea: tarea
                });
            } else {
                res.status(404).json({
                    message: "No se encontró la tarea con id = " + tareaId,
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener la tarea!",
                error: error
            });
        });
};

// Actualizar una tarea por ID
exports.updateById = async (req, res) => {
    try {
        let tareaId = req.params.id;
        let tarea = await Tarea.findByPk(tareaId);

        if (!tarea) {
            res.status(404).json({
                message: "No se encontró la tarea para actualizar con id = " + tareaId,
                tarea: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                completada: req.body.completada,
                fecha_vencimiento: req.body.fecha_vencimiento,
                prioridad: req.body.prioridad,
                asignado_a: req.body.asignado_a,
                categoria: req.body.categoria,
                costo_proyecto: req.body.costo_proyecto,
                pagado: req.body.pagado,
                metodo_pago: req.body.metodo_pago,
                fecha_pago: req.body.fecha_pago
            };

            let result = await Tarea.update(updatedObject, { returning: true, where: { id: tareaId } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar la tarea con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Tarea actualizada con éxito, id = " + tareaId,
                tarea: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar la tarea con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar una tarea por ID
exports.deleteById = async (req, res) => {
    try {
        let tareaId = req.params.id;
        let tarea = await Tarea.findByPk(tareaId);

        if (!tarea) {
            res.status(404).json({
                message: "No existe una tarea con id = " + tareaId,
                error: "404",
            });
        } else {
            await tarea.destroy();
            res.status(200).json({
                message: "Tarea eliminada con éxito, id = " + tareaId,
                tarea: tarea,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar la tarea con id = " + req.params.id,
            error: error.message,
        });
    }
};
