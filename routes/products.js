let express = require("express"),
    productsRouter = express.Router(),
    Product = require("../models/Product.schema");

// Get all products
productsRouter.get('/', (req, res) => {
    Product.find({})
    .then((products) => res.json(products))
    .catch((error) => console.log(error))
})

// create product
productsRouter.post('/', (req, res) => {
    Product.create(req.body)
    .then((products) => res.json(products))
    .catch(err => console.log(err))
});


// get product by id
productsRouter.get('/:id', (req, res) => {
    Product.find({_id: req.params.id})
    .then((product) => res.json(product))
    .catch((err) => console.log(err))
});

// change product details data
productsRouter.put('/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, (err, product) => {
        err ? console.log(err) : res.json(product)
    })
});

// delete product found by id
productsRouter.delete('/:id', (req, res) => {
    Product.findByIdAndDelete(req.params.id, req.body, (err, product) => {
        err ? console.log(err) : res.json(product);
    })
})

module.exports = productsRouter;