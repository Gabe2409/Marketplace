import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  description: {
    type: String,
    trim: true,
    required: 'Description is required'
  },
  price: {
    type: Number,
    required: 'Price is required',
    min: [0, 'Price cannot be negative']
  },
  quantity: {
    type: Number,
    required: 'Quantity is required',
    min: [0, 'Quantity cannot be negative']
  },
  category: {
    type: String,
    trim: true,
    required: 'Category is required'
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Product', ProductSchema);
