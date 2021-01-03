const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    costumer: {
        type: String,
        required: true,
        trim: true
    },
    order: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    phone: {
        type: String
    },
    district: {
        type: String,
        default: true
    }
},{
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order