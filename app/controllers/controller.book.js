const db = require('../config/db.config.js');
const Book = db.Book;

exports.create = (req, res) => {
    let book = {};

    try {
        // Building Book object from uploading request's body
        book.nombre = req.body.nombre;
        book.editorial = req.body.editorial;
        book.autor = req.body.autor;
        book.genero = req.body.genero;
        book.pais = req.body.autor;
        book.paginas = req.body.paginas;
        book.anio = req.body.anio;
        book.precio = req.body.precio;

        // Save to MySQL database
        Book.create(book).then(result => {
            // Send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a Book with id = " + result.id,
                book: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllBooks = (req, res) => {
    // Find all Book information
    Book.findAll()
        .then(bookInfos => {
            res.status(200).json({
                message: "Get all Books' Infos Successfully!",
                bookes: bookInfos
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

exports.getBookById = (req, res) => {
    // Find Book information by ID
    let bookId = req.params.id;
    Book.findByPk(bookId)
        .then(book => {
            res.status(200).json({
                message: "Successfully Get a Book with id = " + bookId,
                book: book
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
        let bookId = req.params.id;
        let book = await Book.findByPk(bookId);

        if (!book) {
            // Return a response to client
            res.status(404).json({
                message: "Not Found for updating a book with id = " + bookId,
                book: "",
                error: "404"
            });
        } else {
            // Update new change to database
            let updatedObject = {
                name: req.body.name,
                editorial: req.body.editorial,
                autor: req.body.autor,
                genero: req.body.genero,
                pais: req.body.autor,
                paginas: req.body.paginas,
                anio: req.body.anio,
                precio: req.body.precio
            }
            let result = await Book.update(updatedObject, { returning: true, where: { id: bookId } });

            // Return the response to client
            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a book with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Book with id = " + bookId,
                book: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a book with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let bookId = req.params.id;
        let book = await Book.findByPk(bookId);

        if (!book) {
            res.status(404).json({
                message: "Does Not exist a Book with id = " + bookId,
                error: "404",
            });
        } else {
            await book.destroy();
            res.status(200).json({
                message: "Delete Successfully a Book with id = " + bookId,
                book: book,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a book with id = " + req.params.id,
            error: error.message,
        });
    }
}
