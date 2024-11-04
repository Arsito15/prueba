const db = require('../config/db.config.js');
const Product = db.Product;

exports.create = (req, res) => {
    let product = {};

    try {
        // Building Product object from uploading request's body
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.stock = req.body.stock;

        // Save to MySQL database
        Product.create(product).then(result => {
            // Send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a Product with id = " + result.id,
                product: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllProducts = (req, res) => {
    // Find all Product information
    Product.findAll()
        .then(productInfos => {
            res.status(200).json({
                message: "Get all Products' Infos Successfully!",
                products: productInfos
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

exports.getProductById = (req, res) => {
    // Find Product information by ID
    let productId = req.params.id;
    Product.findByPk(productId)
        .then(product => {
            res.status(200).json({
                message: "Successfully Get a Product with id = " + productId,
                product: product
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

exports.filteringByPrice = (req, res) => {
    let price = req.query.price;

    Product.findAll({
        attributes: ['id', 'name', 'description', 'price', 'stock'],
        where: { price: price }
    })
        .then(results => {
            res.status(200).json({
                message: "Get all Products with price = " + price,
                products: results,
            });
        })
        .catch(error => {
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

        Product.findAndCountAll({ limit: limit, offset: offset })
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
                        "products": data.rows
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

exports.pagingfilteringsorting = (req, res) => {
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.limit);
        let price = parseFloat(req.query.price);

        const offset = page ? page * limit : 0;

        Product.findAndCountAll({
            attributes: ['id', 'name', 'description', 'price', 'stock'],
            where: { price: price },
            order: [
                ['name', 'ASC']
            ],
            limit: limit,
            offset: offset
        })
            .then(data => {
                const totalPages = Math.ceil(data.count / limit);
                const response = {
                    message: "Pagination Filtering Sorting request is completed! Query parameters: page = " + page + ", limit = " + limit + ", price = " + price,
                    data: {
                        "totalItems": data.count,
                        "totalPages": totalPages,
                        "limit": limit,
                        "price-filtering": price,
                        "currentPageNumber": page + 1,
                        "currentPageSize": data.rows.length,
                        "products": data.rows
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
        let productId = req.params.id;
        let product = await Product.findByPk(productId);

        if (!product) {
            // Return a response to client
            res.status(404).json({
                message: "Not Found for updating a product with id = " + productId,
                product: "",
                error: "404"
            });
        } else {
            // Update new change to database
            let updatedObject = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                stock: req.body.stock,
            }
            let result = await Product.update(updatedObject, { returning: true, where: { id: productId } });

            // Return the response to client
            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a product with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Product with id = " + productId,
                product: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a product with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let productId = req.params.id;
        let product = await Product.findByPk(productId);

        if (!product) {
            res.status(404).json({
                message: "Does Not exist a Product with id = " + productId,
                error: "404",
            });
        } else {
            await product.destroy();
            res.status(200).json({
                message: "Delete Successfully a Product with id = " + productId,
                product: product,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a product with id = " + req.params.id,
            error: error.message,
        });
    }
}
