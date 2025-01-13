import { Op } from 'sequelize';
import db from '../config/config.js';
const Bank = db.Bank;
const Purchase = db.Purchase;

export const createBank = async (req, res) => {
    const { bankTypeId, bankNumber, bankName, balance, status, note } = req.body; // Extract data from the request body
   
    try {
        // Validate input
        if (!bankTypeId) {
            return res.status(400).json({ message: 'bankTypeId is required' });
        }

        const existBankNumber = await Bank.findOne({ where: { bankNumber } });
        if (existBankNumber) {
            return res.status(400).json({ err: `លេខគណនី ${bankNumber} នេះមានម្តងហើយ!` });
        }

        // Create a new bank
        await Bank.create({
            bankTypeId,
            bankNumber,
            bankName,
            balance,
            status,
            note,
        });

        return res.status(201).json({msg: `បានរក្សាគណនីឈ្មោះ​ ${bankNumber} ដោយជោគជ័យ`});
    } catch (error) {
        // Handle errors
        console.log(error);
    }
}

export const fetchBank = async (req, res) => {
    try {
      
        const banks = await Bank.findAll({
            include: [
                {
                    model: db.BankType,
                    as: 'bank_type_id',
                    attributes: ['names']
                }
            ],
            order: [["createdAt", "DESC"]]
        });

        return res.status(200).json(banks);

    } catch (error) {
        // Handle errors
        console.log(error);
    }
};



export const updateBank = async (req, res) => {
    const { bankTypeId, bankNumber, bankName, balance, status, note } = req.body;

    try {
        // Validate input
        if (!bankTypeId) {
            return res.status(400).json({ message: 'bankTypeId is required' });
        }

        // Check for duplicate bankNumber
        if (bankNumber) {
            const existingBank = await Bank.findOne({
                where: {
                    bankNumber,
                    bankId: { [Op.ne]: req.params.id }, // Exclude the current bank
                },
            });

            if (existingBank) {
                return res.status(400).json({
                    msg: `លេខគណនីនេះ "${bankNumber}" មានម្តងហើយ.`,
                });
            }
        }

        // Update the bank record
        const [rowsUpdated] = await Bank.update(
            {
                bankTypeId,
                bankNumber,
                bankName,
                balance,
                status,
                note,
            },
            {
                where: {
                    bankId: req.params.id,
                },
            }
        );

        if (rowsUpdated === 0) {
            return res.status(404).json({ message: 'Bank not found.' });
        }

        // Fetch the updated bank for response
        await Bank.findOne({ where: { bankId: req.params.id } });

        return res.status(200).json({msg: `បានកែប្រែគណនីឈ្មោះ​ ${bankNumber} ដោយជោគជ័យ`})
    } catch (error) {
        // Handle errors
        console.error('Error updating bank:', error);
        return res.status(500).json({
            message: `The bank number "${bankNumber}" is already in use.`,
            error: error.message,
        });
    }
};


export const deleteBank = async (req, res) => {
    try {
        const bankId = req.params.id;

        // Check if the bankId is associated with any purchase
        const associatedPurchases = await Purchase.count({
            where: {
                bankId: bankId,
            },
        });

        if (associatedPurchases > 0) {
            return res.status(400).json({
                message: 'Bank cannot be deleted because it is associated with one or more purchases.',
            });
        }

        // Proceed with deleting the bank if not associated with any purchase
        const rowsDeleted = await Bank.destroy({
            where: {
                bankId: bankId,
            },
        });

        if (rowsDeleted === 0) {
            return res.status(404).json({ message: 'Bank not found.' });
        }

        return res.status(200).json({ message: 'Bank deleted successfully.' });
    } catch (error) {
        // Handle errors
        console.error('Error deleting bank:', error);
        return res.status(500).json({
            message: 'An error occurred while deleting the bank.',
            error: error.message,
        });
    }
};


export const updateStatus = async (req, res) => {
    const { id } = req.params; // Get bank ID from request parameters

    try {
        // Fetch the bank record by ID
        const bank = await Bank.findByPk(id);

        // If the bank does not exist, return a 404 response
        if (!bank) {
            return res.status(404).json({ mg: 'Bank not found.' });
        }

        // Set the status to false
        if (bank.status === false) {
            return res.status(400).json({ msg: 'គណនីនេះបានបិទហើយ' });
        }

        await bank.update({ status: false });

        // Respond with success and the updated status
        return res.status(200).json({msg: `បានបិទគណនីដោយជោគជ័យ`});
    } catch (error) {
        // Handle errors
        console.error('Error updating status:', error);
        return res.status(500).json({
            message: 'An error occurred while updating the bank status.',
            error: error.message,
        });
    }
};


export const updateStatusEnabled = async (req, res) => {
    const { id } = req.params; // Get bank ID from request parameters

    try {
        // Fetch the bank record by ID
        const bank = await Bank.findByPk(id);

        // If the bank does not exist, return a 404 response
        if (!bank) {
            return res.status(404).json({ mg: 'Bank not found.' });
        }

        // Set the status to false
        if (bank.status === true) {
            return res.status(400).json({ msg: 'គណនីនេះមានម្តងហើយ' });
        }

        await bank.update({ status: true });

        // Respond with success and the updated status
        return res.status(200).json({msg: `គណនីនេះបានបើកវិញដោយជោគជ័យ`});
    } catch (error) {
        // Handle errors
        console.error('Error updating status:', error);
        return res.status(500).json({
            message: 'An error occurred while updating the bank status.',
            error: error.message,
        });
    }
};
