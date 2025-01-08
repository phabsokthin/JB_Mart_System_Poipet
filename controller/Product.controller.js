import db from "../config/config.js";

import path from 'path'
import fs from 'fs'
import { Op, where } from "sequelize";
const Product = db.Product;



export const fetchProduct = async (req, res) => {
    try {
       const data = await Product.findAll({
        attributes: ['productId', 'pname','categoryId','unitId', 'brandId', 'pcode', 'status', 'qty', 'const_price', 'include_tax', 'total_amount', 'sell_price', 'profit', 'image', 'url', 'description'],
        include: [
            {
                model: db.Category,
                as: 'cat_id',
                attributes: ['cnames']
            },
            {
                model: db.Unit,
                as: 'unit_id',
                attributes: ['unames']
            },
            {
                model: db.Brand,
                as: 'brand_id',
                attributes: ['bnames']
            }

        ],

        order: [["createdAt", "DESC"]]

       });

       res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
    }
}




export const fetchProductById = async (req, res) => {
    try {
       const data = await Product.findOne({
        attributes: ['productId', 'pname','categoryId','unitId', 'brandId', 'pcode', 'status', 'qty', 'const_price', 'include_tax', 'total_amount', 'sell_price', 'profit', 'image', 'url', 'description'],
        include: [
            {
                model: db.Category,
                as: 'cat_id',
                attributes: ['cnames']
            },
            {
                model: db.Unit,
                as: 'unit_id',
                attributes: ['unames']
            },
            {
                model: db.Brand,
                as: 'brand_id',
                attributes: ['bnames']
            }

        ],

        where: {
            productId: req.params.id
        }

       });

       res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
    }
}




export const createProduct = async (req, res) => {
    let fileName = null;
    let url = null;

    // Check if a file is uploaded
    if (req.files && req.files.file) {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext; 
        url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
        const allowedTypes = ['.png', '.jpg', '.jpeg'];

        // Validate file type
        if (!allowedTypes.includes(ext.toLowerCase())) {
            return res.status(422).json({ msg: "Invalid image type. Only .png, .jpg, and .jpeg are allowed" });
        }

        // Validate file size (5MB limit)
        if (fileSize > 5000000) {
            return res.status(422).json({ msg: "Image size must be 5MB or smaller" });
        }

        // Move the file to the desired directory
        await file.mv(`./public/images/${fileName}`, (err) => {
            if (err) {
                return res.status(500).json({ msg: err.message });
            }
        });
    }


    // Destructure the product details from the request body
    const {
        pname, categoryId, unitId, brandId, pcode, status, qty,
        const_price, include_tax, discount, total_amount, sell_price,
        profit, description,selectedDate,enabled
    } = req.body;

    // Check if a product with the same pcode already exists
    const existingProduct = await Product.findOne({
        where: { pcode }
    });

    if (existingProduct) {
        return res.status(400).json({ msg: `លេខកូដនេះ ${pcode} មានម្តង់ហើយ!` });
    }

    // If no file is uploaded, set default values
    if (!fileName) {
        fileName = null; 
        url = null;
    }

    try {
        // Create the new product
        await Product.create({
            pname, categoryId, unitId, brandId, pcode, status, qty, 
            const_price, include_tax, discount, total_amount,
            sell_price, profit, image: fileName, url, description,selectedDate,enabled
        });

        res.json({ msg: `បានរក្សាទុកផលិតផលឈ្មោះ​ ${pname}` });
    } catch (error) {
        console.error("Error saving product details:", error);
        res.status(500).json({ msg: "Error saving product" });
    }

};

export const deleteProduct = async (req, res) => {
    try {
        // Find the product by its ID
        const product = await Product.findOne({
            where: {
                productId: req.params.id
            }
        });

        // If the product is not found, return an error
        if (!product) {
            return res.status(400).json({ msg: "No data found" });
        }


        const filePath = `./public/images/${product.image}`;
        try {
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath); 
            }
        } catch (err) {
            console.log("Error deleting image file:", err);
            return res.status(500).json({ msg: "Error deleting image file" });
        }


        await Product.destroy({
            where: {
                productId: req.params.id
            }
        });

        // Return a success message
        res.status(200).json({ msg: "Product deleted successfully!" });
    } catch (err) {
        console.log("Error deleting product:", err);
        res.status(500).json({ msg: "Error deleting product" });
    }
};


export const updateProduct = async (req, res) => {
    let fileName = null;
    let url = null;

    if (req.files && req.files.file) {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        url = `${req.protocol}://${req.get('host')}/images/${fileName}`;
        const allowedTypes = ['.png', '.jpg', '.jpeg'];

        // Validate file type
        if (!allowedTypes.includes(ext.toLowerCase())) {
            return res.status(422).json({ msg: "Invalid image type. Only .png, .jpg, and .jpeg are allowed" });
        }

        // Validate file size (5MB limit)
        if (fileSize > 5000000) {
            return res.status(422).json({ msg: "Image size must be 5MB or smaller" });
        }

        // Move the file to the desired directory
        await file.mv(`./public/images/${fileName}`, (err) => {
            if (err) {
                return res.status(500).json({ msg: err.message });
            }
        });
    }

    const {
        pname, categoryId, unitId, brandId, pcode, status, qty,
        const_price, include_tax, discount, total_amount, sell_price,
        profit, description
    } = req.body;

    try {
        // Find the product by its ID
        const product = await Product.findOne({
            where: { productId: req.params.id }
        });

      
        if (!product) {
            return res.status(400).json({ msg: "Product not found" });
        }

 
        if (pcode !== product.pcode) {
            const existingProduct = await Product.findOne({
                where: {
                    pcode,
                    productId: { [Op.ne]: req.params.id }  
                }
            });

            if (existingProduct) {
                return res.status(400).json({ msg: `ផលិតផលនេះ​ ${pcode} មានម្តងហើយ` });
            }
        }

        if (!fileName) {
            fileName = product.image;
            url = product.url;
        } else {
            const oldImagePath = `./public/images/${product.image}`;
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath); 
            }
        }

        await Product.update({
            pname, categoryId, unitId, brandId, pcode, status, qty, 
            const_price, include_tax, discount, total_amount, 
            sell_price, profit, image: fileName, url, description
        }, {
            where: { productId: req.params.id }
        });

        res.json({ msg: "បានកែប្រែផលិតផលដោយជោគជ័យ" });
    } catch (error) {
        console.error("Error updating product details:", error);
        res.status(500).json({ msg: "Error updating product" });
    }
};