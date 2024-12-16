import { Op } from "sequelize";
import db from "../config/config.js";

const Unit = db.Unit


export const fetchUnit = async(req, res) => {

    try{
        await Unit.findAll().then(data => {
            res.send(data)
        }).catch(err => {
            console.log(err)
        })
    }
    catch(err){
        console.log(err)
    }
}


export const createUnit = async (req, res) => {
    const { unames, description } = req.body;

    try {
        const existName = await Unit.findOne({ where: { unames } });
        if (existName) {
            return res.status(400).json({ err: `ប្រភេទនេះ​ ${unames} នេះមានម្តងហើយ!` });
        }

        await Unit.create({
            unames,
            description
        });

        return res.status(200).json({ msg: `Unit ${unames} saved successfully.` });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'An error occurred while saving the Unit.' });
    }
};


export const fetchUnitByID = async(req, res) => {

    try{
        const data = await Unit.findOne({
            where: {
                unitId: req.params.id
            }
        })

        return res.status(200).json(data)
    }
    catch(err){
        console.log(err)
    }
}



export const deleteUnit = async(req, res) => {
    try{
        await Unit.destroy({
            where:{
                unitId: req.params.id
            }
        })

        return res.status(200).json({msg: "បានលុបដោយជោគជ័យ"})
    }
    catch(err){
        console.log
    }
}


export const updateUnit= async (req, res) => {
    const { unames, description } = req.body;

    try {
        // Check if phone or email already exists, but not for the current supplier being updated
        const existName = unames ? await Unit.findOne({ where: { unames, unitId: { [Op.ne]: req.params.id } } }) : null;
        if (existName) {
            return res.status(400).json({ err: `ប្រភេទនេះ ${unames} នេះមានម្តងហើយ!` });
        }

        const updatedFields = {};

     
        if (unames) updatedFields.unames = unames;

        if (description) updatedFields.description = description;

        await Unit.update(updatedFields, {
            where: {
                unitId: req.params.id
            }
        });

        return res.status(200).json({ msg: "Unit updated successfully." });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'An error occurred while updating the Unit.' });
    }
};
