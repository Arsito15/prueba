const db = require('../config/db.config.js');
const Branch = db.Branch;

exports.create = (req, res) => {
    let branch = {};

    try {
        // Building Branch object from uploading request's body
        branch.name = req.body.name;
        branch.address = req.body.address;
        branch.phoneNumber = req.body.phoneNumber;

        // Save to MySQL database
        Branch.create(branch).then(result => {
            // Send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a Branch with id = " + result.id,
                branch: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllBranches = (req, res) => {
    // Find all Branch information
    Branch.findAll()
        .then(branchInfos => {
            res.status(200).json({
                message: "Get all Branches' Infos Successfully!",
                branches: branchInfos
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

exports.getBranchById = (req, res) => {
    // Find Branch information by ID
    let branchId = req.params.id;
    Branch.findByPk(branchId)
        .then(branch => {
            res.status(200).json({
                message: "Successfully Get a Branch with id = " + branchId,
                branch: branch
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


exports.pagination = (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);

        const offset = page ? page * limit : 0;

        Branch.findAndCountAll({ limit: limit, offset: offset })
            .then(data => {
                const totalPages = Math.ceil(data.count / limit);
                const response = {
                    message: "Paginating is completed! Query parameters: page = " + page + ", limit = " + limit,
                    data: {
                        "totalItems": data.count,
                        "totalPages": totalPages,
                        "limit": limit,
                        "currentPageNumber": page + 1,
                        "currentPageSize": data.rows.length,
                        "branches": data.rows
                    }
                };
                res.send(response);
            });
    } catch (error) {
        res.status(500).send({
            message: "Error -> Can NOT complete a paging request!",
            error: error.message,
        });
    }
}

exports.updateById = async (req, res) => {
    try {
        let branchId = req.params.id;
        let branch = await Branch.findByPk(branchId);

        if (!branch) {
            // Return a response to client
            res.status(404).json({
                message: "Not Found for updating a branch with id = " + branchId,
                branch: "",
                error: "404"
            });
        } else {
            // Update new change to database
            let updatedObject = {
                name: req.body.name,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
            }
            let result = await Branch.update(updatedObject, { returning: true, where: { id: branchId } });

            // Return the response to client
            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a branch with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Branch with id = " + branchId,
                branch: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a branch with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let branchId = req.params.id;
        let branch = await Branch.findByPk(branchId);

        if (!branch) {
            res.status(404).json({
                message: "Does Not exist a Branch with id = " + branchId,
                error: "404",
            });
        } else {
            await branch.destroy();
            res.status(200).json({
                message: "Delete Successfully a Branch with id = " + branchId,
                branch: branch,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a branch with id = " + req.params.id,
            error: error.message,
        });
    }
}
