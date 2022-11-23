let mongoose = require("mongoose"),
    ProductSchema = new mongoose.Schema({
        name: String,
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        department: {
            type: String,
            required: ['Department can\'t be empty'],
            validate:[/[A-Z]{3}/],
            max: 3
        },
        price: {
            type: Number,
            required: true
        }
    });

module.exports = mongoose.model("Product", ProductSchema);