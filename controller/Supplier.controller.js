import { Op, where } from "sequelize";
import db  from "../config/config.js";


const Supplier = db.Supplier;



export const createSupplier = async (req, res) => {
    const { supplier_type, full_Name, phone, email, address, description } = req.body;

    try {
        const existingPhone = await Supplier.findOne({ where: { phone } });
        if (existingPhone) {
            return res.status(400).json({ err: `លេខទូរស័ព្ទ​ ${phone} នេះមានម្តងហើយ!` });
        }

        if (email) {
            const existingEmail = await Supplier.findOne({ where: { email } });
            if (existingEmail) {
                return res.status(400).json({ err: `អុីម៉ែល ${email} នេះមានម្តងហើយ!` });
            }
        }

        await Supplier.create({
            supplier_type,
            full_Name,
            phone,
            email,  
            address,
            description
        });

        return res.status(200).json({ msg: `Supplier ${full_Name} saved successfully.` });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'An error occurred while saving the supplier.' });
    }
};




export const fetchSupplier = async(req, res) => {
    try{
        await Supplier.findAll({
            order: [['createdAt', 'DESC']]
        }).then(data => {
            res.send(data)
        }).catch(err => {
            console.log(err)
        })
    }
    catch(err){
        console.log(err)
    }
}

export const fetchSupplierByID = async(req, res) => {
    try{
        const data = await Supplier.findOne({
            where: {
                supplierId: req.params.id
            }
        })

        res.status(200).json(data)
    }
    catch(err){
        console.log(err)
    }
}


export const deleteSpplier = async(req, res) => {
    try{
        await Supplier.destroy({
            where:{
                supplierId: req.params.id
            }
        })

        res.status(200).json({msg: `បានលុបអ្នកផ្គត់ផ្គង់ដោយជោគជ័យ`})
    }
    catch(err){
        console.log(err)
    }
}


export const updateSupplier = async (req, res) => {
    const { supplier_type, full_Name, phone, email, address, description } = req.body;

    try {
        // Check if phone or email already exists, but not for the current supplier being updated
        const existingPhone = phone ? await Supplier.findOne({ where: { phone, supplierId: { [Op.ne]: req.params.id } } }) : null;
        if (existingPhone) {
            return res.status(400).json({ err: `លេខទូរស័ព្ទ​ ${phone} នេះមានម្តងហើយ!` });
        }

        const existingEmail = email ? await Supplier.findOne({ where: { email, supplierId: { [Op.ne]: req.params.id } } }) : null;
        if (existingEmail) {
            return res.status(400).json({ err: `អុីម៉ែល ${email} នេះមានម្តងហើយ!` });
        }

        const updatedFields = {};

        if (supplier_type) updatedFields.supplier_type = supplier_type;
        if (full_Name) updatedFields.full_Name = full_Name;
        if (phone) updatedFields.phone = phone;
        if (email) updatedFields.email = email;
        if (address) updatedFields.address = address;
        if (description) updatedFields.description = description;

        await Supplier.update(updatedFields, {
            where: {
                supplierId: req.params.id
            }
        });

        return res.status(200).json({ msg: "Supplier updated successfully." });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'An error occurred while updating the supplier.' });
    }
};

