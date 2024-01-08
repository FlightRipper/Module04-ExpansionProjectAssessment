import Product from '../models/ProductModel.js';
import User from '../models/UserModel.js';
import fs from 'fs';
import path from 'path';

class productsController {

    //create product
    static async createProduct(req, res) {
        try {
            const image = req.file.filename;
            const user = await User.findByPk(req.params.userId);
            if (!user) {
                return res.status(404).json('User not found');
            }
            const newProduct = await Product.create({ ...req.body, image: image });
            if (!newProduct) {
                return res.status(400).json('Product creation failed');
            }
            await newProduct.setUser(user);

            return res.status(201).json(newProduct);
        } catch (error) {
        return res.status(500).json({ message: error.message });
        }
    }

    static async getAllProduct(req, res) {
        try {
            const products = await Product.findAll({
                include: [
                { model: User, attributes: ['username'] },
                ],
            });
            if (products.length === 0) {
                return res.status(404).json('there are no available products');
            }
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    static async getAllProductsByUser(req, res) {
        try {
            console.log(req.params)
            const userid = req.params.id
            const user = await User.findByPk(userid);
            // console.log(req.params.userId)
            console.log("jon")
            if (!user) {
                return res.status(404).json('User not found');
            }
            const products = await Product.findAll({
                where: {
                    UserId: userid
                },
                include: [
                { model: User, attributes: ['username'] },
                ],
            });
            if (products.length === 0) {
                return res.status(404).json('there are no available products for this user');
            }
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    //update products
    static async updateProduct(req, res) {
        try {
        const oldProduct = await Product.findByPk(req.params.id);
        const oldImage = oldProduct.image;
        console.log(req.body)

        const newData = { ...req.body };

        if (req?.file?.filename) {
            newData.image = req?.file?.filename;
        }

        const [updatedProduct] = await Product.update(newData, {
            where: {
            id: req.params.id,
            },
        });

        if (!updatedProduct) {
            return res.status(404).json("please enter the fields you want to edit");
        }

        if (oldImage) {
            const oldImagePath = path.join("/uploads", "uploads", oldImage);
            if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
            } else {
            console.error("File not found:", oldImagePath);
            }
        }
        const newProduct = await Product.findByPk(req.params.id);

        return res.status(200).json(newProduct);
        } catch (error) {
        return res.status(500).json({ message: error.message });
        }
    }

    //delete product
    static async deleteProduct(req, res) {
        try {
        console.log(req.params.id)
        const deletedProduct = await Product.findByPk(req.params.id)
        // console.log(req.params.id)
        if (!deletedProduct) {
            return res.status(404).json('Product was not found');
        }

        const imageToDelete = deletedProduct.image

        await Product.destroy({
            where: {
            id: req.params.id,
            },
        });
        if (imageToDelete) {
            const imagePath = path.join('./uploads', imageToDelete);
            fs.unlinkSync(imagePath);
        }
        
        return res.status(200).json({ deletedProduct });
        } catch (error) {
        return res.status(500).json({ message: error.message });
        }
    }

    // find product by specific id
    static async findProductById(req, res) {
        try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json('Product not found');
        }
        return res.status(200).json(product);
        } catch (error) {
        return res.status(500).json({ message: error.message });
        }
    }
}

export default productsController;