import { Op } from 'sequelize';
import db from '../config/config.js';
const BankType = db.BankType;

export const createBankType = async (req, res) => {
    const { names, discription } = req.body; // Extract data from the request body

    try {
        // Validate input
        if (!names) {
            return res.status(400).json({ msg: 'names is required' });
        }

        const existName = await BankType.findOne({ where: { names } });
        if (existName) {
            return res.status(400).json({ err: `ប្រភេទគណនី ${names} នេះមានម្តងហើយ!` });
        }

        // Create a new bank type
       await BankType.create({
            names,
            discription,
        });

        return res.status(201).json({msg: `បានបង្កើតប្រភេទ​${names}ដោយជោគជ័យ`});
    } catch (error) {
        // Handle errors
       console.log(error);
    }
};

export const fetchBankType = async (req, res) => {
    try {
        // Fetch all bank types
        const bankTypes = await BankType.findAll();
        return res.status(200).json(bankTypes);
    } catch (error) {
        // Handle errors
        console.log(error);
    }
};

export const fetchBankTypeByID = async (req, res) => {
    try {
        // Find bank type by ID
        const bankType = await BankType.findOne({
            where: {
                bankTypeId: req.params.id,
            },
        });

        return res.status(200).json(bankType);
    } catch (error) {
        // Handle errors
        console.log(error);
    }
};

export const updateBankType = async (req, res) => {
    const { names, discription } = req.body; // Extract data from the request body

    try {
        // Validate input
        if (!names) {
            return res.status(400).json({ msg: 'names is required' });
        }

        const existName = names ? await BankType.findOne({ where: { names, bankTypeId: { [Op.ne]: req.params.id } } }) : null;
        if (existName) {
            return res.status(400).json({ err: `ប្រភេទនេះគណនី ${names} នេះមានម្តងហើយ!` });
        }
        // Update bank type
        await BankType.update(
            {
                names,
                discription,
            },
            {
                where: {
                    bankTypeId: req.params.id,
                },
            }
        );

        return res.status(200).json({ msg: 'បានកែប្រែដោយជោគជ័យ' });
    } catch (error) {
        // Handle errors
        console.log(error);
    }
};


export const deleteBankType = async (req, res) => {
    try {
        // Delete bank type
        await BankType.destroy({
            where: {
                bankTypeId: req.params.id,
            },
        });

        return res.status(200).json({ msg: 'បានលុបដោយជោគជ័យ' });
    } catch (error) {
        // Handle errors
        console.log(error);
    }
};