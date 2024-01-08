import express from 'express';
import productsController from '../controllers/MemeController.js';
import protect from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multerMiddleware.js';
import protectCreator from '../middlewares/creatorProtectMiddleware.js';

const productRouter = express.Router();

// Create a new meme
productRouter.post('/:userId',  upload.single('image'), productsController.createProduct);

// Get all meme
productRouter.get('/', protect, productsController.getAllProduct);

// Get all meme Created by user for the admin panel
productRouter.get('/:id', protectCreator, productsController.getAllProductsByUser);

//get a meme by ID
productRouter.get('/:id/product', protect, productsController.findProductById);

//update meme
productRouter.patch('/:id', protectCreator, upload.single('image'), productsController.updateProduct);

//delete a meme
productRouter.delete('/:id', protectCreator, productsController.deleteProduct);

export default productRouter;