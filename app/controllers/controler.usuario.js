const db = require('../config/db.config.js');
const Usuario = db.Usuario;

// Crear un nuevo usuario
exports.create = (req, res) => {
    let usuario = {};

    try {
        // Construir el objeto Usuario desde el cuerpo de la solicitud
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.telefono = req.body.telefono;
        usuario.rol = req.body.rol || 'usuario';
        usuario.estado = req.body.estado !== undefined ? req.body.estado : true;

        // Guardar en la base de datos
        Usuario.create(usuario).then(result => {
            res.status(200).json({
                message: "Usuario creado con éxito, id = " + result.id,
                usuario: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el usuario!",
            error: error.message
        });
    }
};

// Obtener todos los usuarios
exports.retrieveAllUsuarios = (req, res) => {
    Usuario.findAll()
        .then(usuarios => {
            res.status(200).json({
                message: "Todos los usuarios obtenidos con éxito!",
                usuarios: usuarios
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener los usuarios!",
                error: error
            });
        });
};

// Obtener un usuario por ID
exports.getUsuarioById = (req, res) => {
    let usuarioId = req.params.id;
    Usuario.findByPk(usuarioId)
        .then(usuario => {
            if (usuario) {
                res.status(200).json({
                    message: "Usuario obtenido con éxito, id = " + usuarioId,
                    usuario: usuario
                });
            } else {
                res.status(404).json({
                    message: "No se encontró el usuario con id = " + usuarioId,
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error al obtener el usuario!",
                error: error
            });
        });
};

// Actualizar un usuario por ID
exports.updateById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "No se encontró el usuario para actualizar con id = " + usuarioId,
                usuario: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                email: req.body.email,
                telefono: req.body.telefono,
                rol: req.body.rol,
                estado: req.body.estado
            };

            let result = await Usuario.update(updatedObject, { returning: true, where: { id: usuarioId } });

            if (!result) {
                res.status(500).json({
                    message: "Error al actualizar el usuario con id = " + req.params.id,
                    error: "No se pudo actualizar",
                });
            }

            res.status(200).json({
                message: "Usuario actualizado con éxito, id = " + usuarioId,
                usuario: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el usuario con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar un usuario por ID
exports.deleteById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "No existe un usuario con id = " + usuarioId,
                error: "404",
            });
        } else {
            await usuario.destroy();
            res.status(200).json({
                message: "Usuario eliminado con éxito, id = " + usuarioId,
                usuario: usuario,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el usuario con id = " + req.params.id,
            error: error.message,
        });
    }
};
