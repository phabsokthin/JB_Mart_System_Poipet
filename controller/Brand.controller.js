import { Op } from "sequelize";
import db from "../config/config.js";

const Brand = db.Brand


export const fetchBrand = async(req, res) => {

    try{
        await Brand.findAll().then(data => {
            res.send(data)
        }).catch(err => {
            console.log(err)
        })
    }
    catch(err){
        console.log(err)
    }
}


export const createBrand = async (req, res) => {
    const { bnames, description } = req.body;

    try {
        const existName = await Brand.findOne({ where: { bnames } });
        if (existName) {
            return res.status(400).json({ err: `ម៉ាក់យីហោ ${bnames} នេះមានម្តងហើយ!` });
        }

        await Brand.create({
            bnames,
            description
        });

        return res.status(200).json({ msg: `Brand ${bnames} saved successfully.` });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'An error occurred while saving the Brand.' });
    }
};


export const fetchBrandByID = async(req, res) => {

    try{
        const data = await Brand.findOne({
            where: {
                brandId: req.params.id
            }
        })

        return res.status(200).json(data)
    }
    catch(err){
        console.log(err)
    }
}



export const deleteBrand = async(req, res) => {
    try{
        await Brand.destroy({
            where:{
                brandId: req.params.id
            }
        })

        return res.status(200).json({msg: "បានលុបដោយជោគជ័យ"})
    }
    catch(err){
        console.log
    }
}


export const updateBrand= async (req, res) => {
    const { bnames, description } = req.body;

    try {
        // Check if phone or email already exists, but not for the current supplier being updated
        const existName = bnames ? await Brand.findOne({ where: { bnames, brandId: { [Op.ne]: req.params.id } } }) : null;
        if (existName) {
            return res.status(400).json({ err: `ប្រភេទនេះ ${bnames} នេះមានម្តងហើយ!` });
        }

        const updatedFields = {};

     
        if (bnames) updatedFields.bnames = bnames;

        if (description) updatedFields.description = description;

        await Brand.update(updatedFields, {
            where: {
                brandId: req.params.id
            }
        });

        return res.status(200).json({ msg: "Brand updated successfully." });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'An error occurred while updating the Brand.' });
    }
};
