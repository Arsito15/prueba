

const db = require('../config/db.config.js');
const Catedratico = db.Catedratico;

exports.create = (req, res) => {
    let catedratico = {};

    try{
        // Building Catedratico object from upoading request's body
        catedratico.Nombre = req.body.Nombre;
        catedratico.FechaContratacion = req.body.FechaContratacion;
        catedratico.FechaNacimiento = req.body.FechaNacimiento;
        catedratico.Genero = req.body.Genero;
        catedratico.Titulo = req.body.Titulo;
        catedratico.Salario = req.body.Salario;
    
        // Save to MySQL database
        Catedratico.create(catedratico).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a Catedratico with id = " + result.id,
                catedratico: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllCatedraticos = (req, res) => {
    // find all Catedratico information from 
    Catedratico.findAll()
        .then(catedraticoInfos => {
            res.status(200).json({
                message: "Get all Catedraticos' Infos Successfully!",
                catedraticos: catedraticoInfos
            });
        })
        . catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
}

exports.getCatedraticoById = (req, res) => {
  // find all Catedratico information from 
  let catedraticoId = req.params.id;
  Catedratico.findByPk(catedraticoId)
      .then(catedratico => {
          res.status(200).json({
              message: " Successfully Get a Catedratico with id = " + catedraticoId,
              catedraticos: catedratico
          });
      })
      . catch(error => {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
      });
}

exports.updateById = async (req, res) => {
    try{
        let catedraticoId = req.params.id;
        let catedratico = await Catedratico.findByPk(catedraticoId);
    
        if(!catedratico){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a catedratico with id = " + catedraticoId,
                catedratico: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                Nombre: req.body.Nombre,
                FechaContratacion: req.body.FechaContratacion,
                FechaNacimiento: req.body.FechaNacimiento,
                Genero: req.body.Genero,
                Titulo: req.body.Titulo,
                Salario: req.body.Salario
            }
            let result = await Catedratico.update(updatedObject, {returning: true, where: {id: catedraticoId}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a catedratico with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Catedratico with id = " + catedraticoId,
                catedratico: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a catedratico with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let catedraticoId = req.params.id;
        let catedratico = await Catedratico.findByPk(catedraticoId);

        if(!catedratico){
            res.status(404).json({
                message: "Does Not exist a Catedratico with id = " + catedraticoId,
                error: "404",
            });
        } else {
            await catedratico.destroy();
            res.status(200).json({
                message: "Delete Successfully a Catedratico with id = " + catedraticoId,
                catedratico: catedratico,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a catedratico with id = " + req.params.id,
            error: error.message,
        });
    }
}