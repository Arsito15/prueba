

const db = require('../config/db.config.js');
const Ingreso = db.Ingreso;

exports.create = (req, res) => {
    let ingreso = {};

    try{
        // Building Ingreso object from upoading request's body
        ingreso.idCatedratico = req.body.idCatedratico;
        ingreso.FechaHoraIngreso = req.body.FechaHoraIngreso;
        ingreso.FechaHoraSalida = req.body.FechaHoraSalida;
        ingreso.Estatus = req.body.Estatus;
    
        // Save to MySQL database
        Ingreso.create(ingreso).then(result => {    
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a Ingreso with id = " + result.id,
                ingreso: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllIngresos = (req, res) => {
    // find all Ingreso information from 
    Ingreso.findAll()
        .then(ingresoInfos => {
            res.status(200).json({
                message: "Get all Ingresos' Infos Successfully!",
                ingresos: ingresoInfos
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

exports.getIngresoById = (req, res) => {
  // find all Ingreso information from 
  let ingresoId = req.params.id;
  Ingreso.findByPk(ingresoId)
      .then(ingreso => {
          res.status(200).json({
              message: " Successfully Get a Ingreso with id = " + ingresoId,
              ingresos: ingreso
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
        let ingresoId = req.params.id;
        let ingreso = await Ingreso.findByPk(ingresoId);
    
        if(!ingreso){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a ingreso with id = " + ingresoId,
                ingreso: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                idCatedratico: req.body.idCatedratico,
                FechaHoraIngreso: req.body.FechaHoraIngreso,
                FechaHoraSalida: req.body.FechaHoraSalida,
                Estatus: req.body.Estatus
            }
            let result = await Ingreso.update(updatedObject, {returning: true, where: {id: ingresoId}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a ingreso with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Ingreso with id = " + ingresoId,
                ingreso: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a ingreso with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let ingresoId = req.params.id;
        let ingreso = await Ingreso.findByPk(ingresoId);

        if(!ingreso){
            res.status(404).json({
                message: "Does Not exist a Ingreso with id = " + ingresoId,
                error: "404",
            });
        } else {
            await ingreso.destroy();
            res.status(200).json({
                message: "Delete Successfully a Ingreso with id = " + ingresoId,
                ingreso: ingreso,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a ingreso with id = " + req.params.id,
            error: error.message,
        });
    }
}