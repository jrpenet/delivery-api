const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    image: {
        type: Buffer
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    active: {
        type: Boolean,
        default: true
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product