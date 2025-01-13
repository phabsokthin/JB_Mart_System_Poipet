import { Op } from 'sequelize';
import db from '../config/config.js'; // Ensure your config exports sequelize

const { BankTransfer, Bank, sequelize } = db; // Include sequelize instance

// export const createBankTransfer = async (req, res) => {
//     const { fromBankId, toBankId, amount, note } = req.body;

//     try {
//         // Validate input
//         if (!fromBankId || !toBankId) {
//             return res.status(400).json({ msg: 'Both fromBankId and toBankId are required.' });
//         }

//         if (fromBankId === toBankId) {
//             return res.status(400).json({ msg: 'Cannot transfer to the same bank account.' });
//         }

//         if (!amount || amount <= 0) {
//             return res.status(400).json({ msg: 'សូមជ្រើសរើសចំនួនទឹកប្រាក់ដើម្បីផ្ទេរ' });
//         }

//         // Fetch the "from" bank
//         const fromBank = await Bank.findByPk(fromBankId);
//         if (!fromBank) {
//             return res.status(404).json({ msg: 'From bank account not found.' });
//         }

//         // Check the status of the "from" bank
//         if (!fromBank.status) {
//             return res.status(400).json({ msg: 'គណនីផ្ទេរបានបិទហើយ។ សូមព្យាយាមម្តងទៀត' });
//         }

//         // Fetch the "to" bank
//         const toBank = await Bank.findByPk(toBankId);
//         if (!toBank) {
//             return res.status(404).json({ msg: 'To bank account not found.' });
//         }

//         // Check the status of the "to" bank
//         if (!toBank.status) {
//             return res.status(400).json({ msg: 'មិនអាចផ្ទេរទៅកាន់គណនីផ្សេងទៀតទេ​​។​​ គណនីនេះបានបិទហើយ! ព្យាយាមម្តងទៀត' });
//         }

//         // Check if "from" bank has sufficient balance
//         if (fromBank.balance < amount) {
//             return res.status(400).json({ msg: 'មិនមានទឹកប្រាក់គ្រប់គ្រាន់សម្រាប់ផ្ទេរចេញទេ។​ សូមព្យាយាមម្តងទៀត' });
//         }

//         // Perform the transfer within a transaction
//         const transaction = await sequelize.transaction();
//         try {
//             // Debit the "from" bank
//             fromBank.balance -= amount;
//             await fromBank.save({ transaction });

//             // Credit the "to" bank
//             toBank.balance += amount;
//             await toBank.save({ transaction });

//             // Record the transfer
//             const newBankTransfer = await BankTransfer.create(
//                 {
//                     bankId: fromBankId,
//                     balance: -amount, // Negative for debit
//                     status: true, // Assume status is true for successful transfer
//                     bankTo: toBankId,
//                     note: `បានផ្ទេរលុយទៅកាន់គណនីឈ្មោះ ${toBank.bankName}`,
//                 },
//                 { transaction }
//             );

//             await BankTransfer.create(
//                 {
//                     bankId: toBankId,
//                     balance: amount, // Positive for credit
//                     status: true,
//                     note: `បានទទួលលុយពីគណនី ${fromBank.bankName}`,
//                 },
//                 { transaction }
//             );

//             // Commit the transaction
//             await transaction.commit();

//             // Include bank names in the success message
//             return res.status(201).json({
//                 msg: `បានផ្ទេរលុយដោយជោគជ័យ ពីគណនី "${fromBank.bankName}" ទៅគណនី "${toBank.bankName}"`,
//                 transfer: newBankTransfer,
//             });
//         } catch (error) {
//             // Rollback the transaction on error
//             await transaction.rollback();
//             throw error;
//         }
//     } catch (error) {
//         // Handle errors
//         console.error('Error creating bank transfer:', error);
//         return res.status(500).json({
//             msg: 'An error occurred while processing the bank transfer.',
//             error: error.msg,
//         });
//     }
// };


export const createBankTransfer = async (req, res) => {
    const { fromBankId, toBankId, amount, note } = req.body;

    try {
        // Validate input
        if (!fromBankId || !toBankId) {
            return res.status(400).json({ msg: 'Both fromBankId and toBankId are required.' });
        }

        if (fromBankId === toBankId) {
            return res.status(400).json({ msg: 'Cannot transfer to the same bank account.' });
        }

        if (!amount || amount <= 0) {
            return res.status(400).json({ msg: 'សូមជ្រើសរើសចំនួនទឹកប្រាក់ដើម្បីផ្ទេរ' });
        }

        // Fetch the "from" bank
        const fromBank = await Bank.findByPk(fromBankId);
        if (!fromBank) {
            return res.status(404).json({ msg: 'From bank account not found.' });
        }

        // Check the status of the "from" bank
        if (!fromBank.status) {
            return res.status(400).json({ msg: 'គណនីផ្ទេរបានបិទហើយ។ សូមព្យាយាមម្តងទៀត' });
        }

        // Fetch the "to" bank
        const toBank = await Bank.findByPk(toBankId);
        if (!toBank) {
            return res.status(404).json({ msg: 'To bank account not found.' });
        }

        // Check the status of the "to" bank
        if (!toBank.status) {
            return res.status(400).json({ msg: 'មិនអាចផ្ទេរទៅកាន់គណនីផ្សេងទៀតទេ​​។​​ គណនីនេះបានបិទហើយ! ព្យាយាមម្តងទៀត' });
        }

        // Check if "from" bank has sufficient balance
        if (fromBank.balance < amount) {
            return res.status(400).json({ msg: 'មិនមានទឹកប្រាក់គ្រប់គ្រាន់សម្រាប់ផ្ទេរចេញទេ។​ សូមព្យាយាមម្តងទៀត' });
        }

        // Perform the transfer within a transaction
        const transaction = await sequelize.transaction();
        try {
            // Debit the "from" bank
            fromBank.balance -= amount;
            await fromBank.save({ transaction });

            // Credit the "to" bank
            toBank.balance += amount;
            await toBank.save({ transaction });

            // Record the transfer
            const newBankTransfer = await BankTransfer.create(
                {
                    bankId: fromBankId,
                    balance: -amount, // Negative for debit
                    status: true, // Assume status is true for successful transfer
                    bankTo: toBankId,
                    note: `Transfer to bank ${toBankId}: ${note || ''} `,
                },
                { transaction }
            );

            await BankTransfer.create(
                {
                    bankId: toBankId,
                    balance: amount, // Positive for credit
                    status: true,
                    note: `Transfer from bank ${fromBankId}: ${note || ''}`,
                },
                { transaction }
            );

            // Commit the transaction
            await transaction.commit();
            return res.status(201).json({ msg: 'បានផ្ទេរលុយដោយជោគជ័យ.', transfer: newBankTransfer });


        } catch (error) {
            // Rollback the transaction on error
            await transaction.rollback();
            throw error;
        }
    } catch (error) {
        // Handle errors
        console.error('Error creating bank transfer:', error);
        return res.status(500).json({
            msg: 'An error occurred while processing the bank transfer.',
            error: error.msg,
        });
    }
};



export const fetchBankTransfers = async (req, res) => {
    try {
        // Fetch all bank transfers
        const bankTransfers = await BankTransfer.findAll({
            include: [
                {
                    model: db.Bank,
                    as: 'bank_transfers_id',
                    attributes: ['bankName']
                }
            ],
            order: [["createdAt", "DESC"]]
        });
        return res.status(200).json(bankTransfers);

    } catch (error) {
        // Handle errors
        console.log(error);
    }
};


export const deleteBankTransfer = async (req, res) => {
    const { id } = req.params; // Extract the transfer ID from the request parameters

    try {
        // Find the bank transfer record
        const transfer = await BankTransfer.findByPk(id);
        if (!transfer) {
            return res.status(404).json({ msg: 'Bank transfer not found.' });
        }

        // Extract transfer details
        const { bankId, balance } = transfer;

        // Start a transaction
        const transaction = await sequelize.transaction();
        try {
            // Determine if the transfer was a debit or credit
            if (balance < 0) {
                // If balance is negative, it’s a debit: Reverse it
                const fromBank = await Bank.findByPk(bankId);
                const toBankId = transfer.note.match(/\d+/)?.[0]; // Extract the `toBankId` from the note
                const toBank = toBankId ? await Bank.findByPk(toBankId) : null;

                if (!fromBank || !toBank) {
                    throw new Error('Bank account(s) involved in the transfer not found.');
                }

                fromBank.balance += Math.abs(balance); // Add back the debited amount
                toBank.balance -= Math.abs(balance); // Deduct the credited amount

                await fromBank.save({ transaction });
                await toBank.save({ transaction });
            } else {
                // If balance is positive, it’s a credit: Reverse it
                const toBank = await Bank.findByPk(bankId);
                const fromBankId = transfer.note.match(/\d+/)?.[0]; // Extract the `fromBankId` from the note
                const fromBank = fromBankId ? await Bank.findByPk(fromBankId) : null;

                if (!toBank || !fromBank) {
                    throw new Error('Bank account(s) involved in the transfer not found.');
                }

                toBank.balance -= balance; // Deduct the credited amount
                fromBank.balance += balance; // Add back the debited amount

                await toBank.save({ transaction });
                await fromBank.save({ transaction });
            }

            // Delete the transfer record
            await transfer.destroy({ transaction });

            // Commit the transaction
            await transaction.commit();

            return res.status(200).json({ msg: 'Bank transfer deleted successfully.' });
        } catch (error) {
            // Rollback the transaction on error
            await transaction.rollback();
            throw error;
        }
    } catch (error) {
        // Handle errors
        console.error('Error deleting bank transfer:', error);
        return res.status(500).json({
            msg: 'An error occurred while deleting the bank transfer.',
            error: error.msg,
        });
    }
};
