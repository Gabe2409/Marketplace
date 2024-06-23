import Product from '../models/product.model.js';
import extend from 'lodash/extend.js';
import errorHandler from './error.controller.js';

// Create a new product
const create = async (req, res) => { 
  const product = new Product(req.body);
  try {
    await product.save();
    return res.status(200).json({ 
      message: "Product successfully created!"
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

// List all products or filter by name
const list = async (req, res) => { 
  const { name } = req.query;
  try {
    let products;
    if (name) {
      const regex = new RegExp(name, 'i'); // case-insensitive search
      products = await Product.find({ name: regex });
    } else {
      products = await Product.find();
    }
    res.json(products);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

// Middleware to find product by ID
const productByID = async (req, res, next, id) => { 
  try {
    let product = await Product.findById(id);
    if (!product)
      return res.status('400').json({ 
        error: "Product not found"
      });
    req.product = product;
    next();
  } catch (err) {
    return res.status('400').json({ 
      error: "Could not retrieve product"
    }); 
  }
};

// Read a single product
const read = (req, res) => {
  return res.json(req.product);
};

// Update a product
const update = async (req, res) => { 
  try {
    let product = req.product;
    product = extend(product, req.body);
    product.updated = Date.now();
    await product.save();
    res.json(product);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

// Remove a product
const remove = async (req, res) => { 
  try {
    let product = req.product;
    let deletedProduct = await product.deleteOne();
    res.json(deletedProduct);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};
 
// Remove all products
const removeAll = async (req, res) => { 
  try {
    await Product.deleteMany({});
    res.json({ message: 'All products have been deleted' });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

export default { create, productByID, read, list, remove, update, removeAll };