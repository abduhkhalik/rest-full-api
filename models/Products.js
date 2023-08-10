const mongoose = require('mongoose');

const productsSchema = mongoose.Schema(
    {
        name:{
            type: String,
            requred: [true, 'Tolong Masukan Nama Product!']
        },
        quantity: {
            type: Number,
            default: 0,
            requred: [true, 'Tolong Masukan Jumlah Product!']
        },
        price: {
            type: Number,
            required: true
        },
        img: {
            type: String,
            required: false
        }
    },
    {
        timeStamp: true
    }
)

const Product = mongoose.model('Product' ,productsSchema);

module.exports = Product