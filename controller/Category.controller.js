import { Op } from "sequelize";
import db from "../config/config.js";

const Category = db.Category


export const fetchCategory = async(req, res) => {

    try{
        await Category.findAll().then(data => {
            res.send(data)
        }).catch(err => {
            console.log(err)
        })
    }
    catch(err){
        console.log(err)
    }
}


export const createCategory = async (req, res) => {
    const { cnames, description } = req.body;

    try {
        const existName = await Category.findOne({ where: { cnames } });
        if (existName) {
            return res.status(400).json({ err: `ប្រភេទនេះ​ ${cnames} នេះមានម្តងហើយ!` });
        }

        await Category.create({
            cnames,
            description
        });

        return res.status(200).json({ msg: `Category ${cnames} saved successfully.` });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'An error occurred while saving the category.' });
    }
};


export const fetchCategoryByID = async(req, res) => {

    try{
        const data = await Category.findOne({
            where: {
                categoryId: req.params.id
            }
        })

        return res.status(200).json(data)
    }
    catch(err){
        console.log(err)
    }
}



export const deleteCategory = async(req, res) => {
    try{
        await Category.destroy({
            where:{
                categoryId: req.params.id
            }
        })

        return res.status(200).json({msg: "បានលុបដោយជោគជ័យ"})
    }
    catch(err){
        console.log
    }
}


export const updateCategory= async (req, res) => {
    const { cnames, description } = req.body;

    try {
        // Check if phone or email already exists, but not for the current supplier being updated
        const existName = cnames ? await Category.findOne({ where: { cnames, categoryId: { [Op.ne]: req.params.id } } }) : null;
        if (existName) {
            return res.status(400).json({ err: `ប្រភេទនេះ ${cnames} នេះមានម្តងហើយ!` });
        }

        const updatedFields = {};

     
        if (cnames) updatedFields.cnames = cnames;

        if (description) updatedFields.description = description;

        await Category.update(updatedFields, {
            where: {
                categoryId: req.params.id
            }
        });

        return res.status(200).json({ msg: "Category updated successfully." });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'An error occurred while updating the category.' });
    }
};
