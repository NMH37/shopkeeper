const mongoose = require('mongoose');
// const check_valid = require('mongoose-unique-validator');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Enter Product name!'],
    min: [3, ' Name of the Product needs to be atleast 3 charcters'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Enter Price, it has to be atleast $1'],
    min: [1, 'Type cannot be less than 3 characters'],
    trim: true
  },
  quantity: {
    type: Number,
    required: [true, 'Enter quantity of your Product'],
    min: [0, ' Quantity cannot be less than zero'],
    trim: true
  }

}, { timestamps: true });
// productSchema.plugin(check_valid, { message: 'Name must be unique value!' });
module.exports = mongoose.model('product', productSchema);
