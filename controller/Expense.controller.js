import { where } from "sequelize";
import db from "../config/config.js";
const sequelize = db.sequelize; // Access the Sequelize instance

const Expense = db.Expense;

const Bank = db.Bank;

export const createExpense = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const {
            expenseTypeId,
            total,
            paymentAmount,
            totalAmount,
            balance, // New balance field
            expenseDate,
            bankId,
            description,
        } = req.body;

        // Validate required fields
        if (
            expenseTypeId === undefined || // Ensure expenseTypeId is provided
            total === undefined ||         // Ensure total is provided
            paymentAmount === undefined || // Ensure paymentAmount is provided
            totalAmount === undefined ||   // Allow totalAmount to be 0 but ensure it is defined
            !expenseDate ||                // Ensure expenseDate is provided
            !bankId                        // Ensure bankId is provided
        ) {
            return res.status(400).json({ msg: "All required fields must be provided." });
        }

        // Fetch the bank record and check its status
        const bank = await Bank.findByPk(bankId, { transaction });
        if (!bank) {
            return res.status(404).json({ msg: `Bank with ID ${bankId} not found.` });
        }

        if (bank.status === 0) { // Check if the bank account is active
            return res.status(403).json({
                msg: `គណនីនេះបានបិទហើយ។`, // Account is closed
            });
        }

        // Check if the bank has sufficient balance for the payment
        if (bank.balance < paymentAmount) {
            return res.status(400).json({
                msg: `សាច់ប្រាក់នៅសល់ ${bank.balance}, មិនអាចទូទាត់ចំនួន ${paymentAmount} ទេ។`,
            });
        }

        // Calculate balance if not provided
        const calculatedBalance = balance ?? totalAmount - paymentAmount;

        // Create the expense record
        const newExpense = await Expense.create({
            expenseTypeId,
            total,
            paymentAmount,
            totalAmount,
            balance: calculatedBalance,
            expenseDate,
            bankId,
            description,
        }, { transaction });

        // Update the bank balance based on the payment amount
        bank.balance -= paymentAmount;
        await bank.save({ transaction });

        await transaction.commit();

        res.status(201).json({
            msg: "Expense created successfully, and bank balance updated.",
            expense: newExpense,
            bank: {
                bankId: bank.bankId,
                newBalance: bank.balance,
            },
        });

    } catch (error) {
        if (transaction) await transaction.rollback();
        res.status(500).json({
            msg: "Failed to create expense and update bank balance.",
            error: error.message, // Use `error.message` for proper error reporting
        });
    }
};


export const fetchExpense = async (req, res) => {

    try {
        const data = await Expense.findAll({
            include: [
                {
                    model: db.Bank,
                    as: 'bankId_for_expense',
                    attributes: ['bankName']
                },
                {
                    model: db.ExpenseType,
                    as: 'expenseId_for_expense',
                    attributes: ['names']

                }
            ],
            order: [["createdAt", "DESC"]]
        });
        return res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
    }
}

export const deleteExpense = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const { id } = req.params; // Assuming the expense ID is passed in the URL params

        // Find the expense to delete
        const expense = await Expense.findByPk(id, { transaction });
        if (!expense) {
            return res.status(404).json({ msg: `Expense with ID ${id} not found.` });
        }

        // Fetch the bank associated with the expense
        const bank = await Bank.findByPk(expense.bankId, { transaction });
        if (!bank) {
            return res.status(404).json({ msg: `Bank with ID ${expense.bankId} not found.` });
        }

        // Update the bank balance by adding back the payment amount
        bank.balance += expense.paymentAmount;
        await bank.save({ transaction });

        // Delete the expense record
        await expense.destroy({ transaction });

        await transaction.commit();

        res.status(200).json({
            msg: "Expense deleted successfully, and bank balance updated.",
            bank: {
                bankId: bank.bankId,
                newBalance: bank.balance,
            },
        });
    } catch (error) {
        if (transaction) await transaction.rollback();
        res.status(500).json({
            msg: "Failed to delete expense and update bank balance.",
            error: error.message, // Use `error.message` for proper error reporting
        });
    }
};



export const fetchExpenseById = async (req, res) => {

    try {
        const data = await Expense.findAll({
            include: [
                {
                    model: db.Bank,
                    as: 'bankId_for_expense',
                    attributes: ['bankName']
                },
                {
                    model: db.ExpenseType,
                    as: 'expenseId_for_expense',
                    attributes: ['names']

                }
            ],
            order: [["createdAt", "DESC"]]
        }, {
            where: {
                expenseId: req.params.id
            }
        });
        return res.status(200).json(data)
    }
    catch (err) {
        console.log(err)
    }
}



export const updateExpense = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const { id } = req.params; // Extract expense ID from URL params
        const {
            expenseTypeId,
            total,
            paymentAmount,
            totalAmount,
            expenseDate,
            bankId,
            balance, // Optional balance field
            description,
        } = req.body;

        // Check if required fields are provided
        if (
            expenseTypeId === undefined || 
            total === undefined || 
            paymentAmount === undefined || 
            totalAmount === undefined || 
            !expenseDate || 
            !bankId
        ) {
            return res.status(400).json({ msg: "All required fields must be provided." });
        }

        // Fetch the expense to be updated
        const expense = await Expense.findByPk(id, { transaction });
        if (!expense) {
            return res.status(404).json({ msg: `Expense with ID ${id} not found.` });
        }

        // Fetch the associated bank record
        const bank = await Bank.findByPk(bankId, { transaction });
        if (!bank) {
            return res.status(404).json({ msg: `Bank with ID ${bankId} not found.` });
        }

        if (bank.status === 0) {
            return res.status(403).json({
                msg: `គណនីនេះបានបិទហើយ។`, // Account is closed
            });
        }

        // Save the previous paymentAmount to calculate the difference later
        const previousPaymentAmount = expense.paymentAmount;

        // Calculate the difference in paymentAmount
        const paymentDifference = paymentAmount - previousPaymentAmount;

        // Check if the bank has sufficient balance for the updated payment
        if (paymentDifference > 0 && bank.balance < paymentDifference) {
            return res.status(400).json({
                msg: `សាច់ប្រាក់នៅសល់ ${bank.balance}, មិនអាចទូទាត់ចំនួន ${paymentDifference} ទេ។`,
            });
        }

        // Calculate balance if not provided
        const calculatedBalance = balance ?? totalAmount - paymentAmount;

        // Update the expense record with new values
        expense.expenseTypeId = expenseTypeId;
        expense.total = total;
        expense.paymentAmount = paymentAmount;
        expense.totalAmount = totalAmount;
        expense.balance = calculatedBalance;
        expense.expenseDate = expenseDate;
        expense.bankId = bankId;
        expense.description = description;

        await expense.save({ transaction });

        // Update the bank balance based on the difference
        if (paymentDifference > 0) {
            // Increase bank balance (more payment made than before)
            bank.balance -= paymentDifference;
        } else if (paymentDifference < 0) {
            // Decrease bank balance (less payment made than before)
            bank.balance -= paymentDifference; // `paymentDifference` is negative
        }

        await bank.save({ transaction });

        await transaction.commit();

        res.status(200).json({
            msg: `Expense updated successfully. Bank balance adjusted by ${paymentDifference > 0 ? "deducting" : "adding"} ${Math.abs(paymentDifference)}.`,
            expense,
            bank: {
                bankId: bank.bankId,
                newBalance: bank.balance,
            },
        });
    } catch (error) {
        if (transaction) await transaction.rollback();
        res.status(500).json({
            msg: "Failed to update expense and update bank balance.",
            error: error.message, // Properly include the error message
        });
    }
};

