import { Op, where } from 'sequelize';
import db from '../config/config.js'
const Customer = db.Customer;


export const fetchCutomer = async(req, res) => {
    try{
        await Customer.findAll({
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




export const createCustomer = async (req, res) => {
    const { customer_type, full_Name, phone, email, address, description } = req.body;

    try {
        const existingPhone = await Customer.findOne({ where: { phone } });
        if (existingPhone) {
            return res.status(400).json({ err: `លេខទូរស័ព្ទ​ ${phone} នេះមានម្តងហើយ!` });
        }

        if (email) {
            const existingEmail = await Customer.findOne({ where: { email } });
            if (existingEmail) {
                return res.status(400).json({ err: `អុីម៉ែល ${email} នេះមានម្តងហើយ!` });
            }
        }

        await Customer.create({
            customer_type,
            full_Name,
            phone,
            email,  
            address,
            description
        });

        return res.status(200).json({ msg: `Customer ${full_Name} saved successfully.` });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'An error occurred while saving the customer.' });
    }
};


export const fetchCutomerByID = async(req, res) => {

    try{
        const data = await Customer.findOne({
            where: {
                customerId: req.params.id
            }
        })

        return res.status(200).json(data)
    }
    catch(err){
        console.log(err)
    }
}

export const deleteCustomer = async(req, res) => {
    try{
        await Customer.destroy({
            where:{
                customerId: req.params.id
            }
        })

        return res.status(200).json({msg: "បានលុបអតិថិជនដោយជោគជ័យ"})
    }
    catch(err){
        console.log
    }
}



export const updateCustomer = async (req, res) => {
    const { customer_type, full_Name, phone, email, address, description } = req.body;

    try {
        // Check if phone or email already exists, but not for the current Customer being updated
        const existingPhone = phone ? await Customer.findOne({ where: { phone, customerId: { [Op.ne]: req.params.id } } }) : null;
        if (existingPhone) {
            return res.status(400).json({ err: `លេខទូរស័ព្ទ​ ${phone} នេះមានម្តងហើយ!` });
        }

        const existingEmail = email ? await Customer.findOne({ where: { email, customerId: { [Op.ne]: req.params.id } } }) : null;
        if (existingEmail) {
            return res.status(400).json({ err: `អុីម៉ែល ${email} នេះមានម្តងហើយ!` });
        }

        const updatedFields = {};

        if (customer_type) updatedFields.customer_type = customer_type;
        if (full_Name) updatedFields.full_Name = full_Name;
        if (phone) updatedFields.phone = phone;
        if (email) updatedFields.email = email;
        if (address) updatedFields.address = address;
        if (description) updatedFields.description = description;

        await Customer.update(updatedFields, {
            where: {
                CustomerId: req.params.id
            }
        });

        return res.status(200).json({ msg: "Customer updated successfully." });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'An error occurred while updating the Customer.' });
    }
};
