import db from "../config/config.js";
const sequelize = db.sequelize; // Access the Sequelize instance

const Expense = db.Expense;
const Bank = db.Bank;

export const createExpense = async (req, res) => {
    const transaction = await sequelize.transaction(); // Ensure sequelize is properly imported

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

        if (!expenseTypeId || !total || !paymentAmount || !totalAmount || !expenseDate || !bankId) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        // Fetch the bank record and check its status
        const bank = await Bank.findByPk(bankId, { transaction });
        if (!bank) {
            return res.status(404).json({ message: `Bank with ID ${bankId} not found.` });
        }

        if (bank.status === 0) { // Assuming 'false' is the condition to restrict creation
            return res.status(403).json({
                message: `គណនីនេះបានបិទហើយ។`, // Message in Khmer
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

        // Update the bank balance
        bank.balance += totalAmount;
        await bank.save({ transaction });

        await transaction.commit();

        res.status(201).json({
            message: "Expense created successfully, and bank balance updated.",
            expense: newExpense,
            bank: {
                bankId: bank.bankId,
                newBalance: bank.balance,
            },
        });
    } catch (error) {
        if (transaction) await transaction.rollback();
        res.status(500).json({
            message: "Failed to create expense and update bank balance.",
            error: error.message,
        });
    }
};

export const fetchExpense = async(req, res) => {

    try{
        const data = await Expense.findAll({
            include: [
                {
                    model: db.Bank,
                    as: 'bankId_for_expense',
                    attributes: ['bankName']
                }
            ],
            order: [["createdAt", "DESC"]]
        });
        return res.status(200).json(data)
    }
    catch(err){
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
            return res.status(404).json({ message: `Expense with ID ${id} not found.` });
        }

        // Fetch the bank associated with the expense
        const bank = await Bank.findByPk(expense.bankId, { transaction });
        if (!bank) {
            return res.status(404).json({ message: `Bank with ID ${expense.bankId} not found.` });
        }

        // Update the bank balance by subtracting the expense total amount
        bank.balance -= expense.totalAmount;
        await bank.save({ transaction });

        // Delete the expense record
        await expense.destroy({ transaction });

        await transaction.commit();

        res.status(200).json({
            message: "Expense deleted successfully, and bank balance updated.",
            bank: {
                bankId: bank.bankId,
                newBalance: bank.balance,
            },
        });
    } catch (error) {
        if (transaction) await transaction.rollback();
        res.status(500).json({
            message: "Failed to delete expense and update bank balance.",
            error: error.message,
        });
    }
};


export const updateExpense = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const { id } = req.params; // Extract expenseId from URL params
        const {
            expenseTypeId,
            total,
            paymentAmount,
            totalAmount,
            expenseDate,
            bankId,
            balance, // New balance field
            description,
        } = req.body;

        // Check if required fields are provided
        if (!expenseTypeId || !total || !paymentAmount || !totalAmount || !expenseDate || !bankId) {
            return res.status(400).json({ message: "All required fields must be provided." });
        }

        // Fetch the expense to be updated
        const expense = await Expense.findByPk(id, { transaction });
        if (!expense) {
            return res.status(404).json({ message: `Expense with ID ${id} not found.` });
        }

        // Fetch the bank associated with the expense
        const bank = await Bank.findByPk(bankId, { transaction });
        if (!bank) {
            return res.status(404).json({ message: `Bank with ID ${bankId} not found.` });
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

        // Calculate the difference in totalAmount
        const difference = totalAmount - expense.totalAmount;

        // Update bank balance based on the difference
        if (difference > 0) {
            // New totalAmount is greater, increase bank balance
            bank.balance += difference;
        } else if (difference < 0) {
            // New totalAmount is less, decrease bank balance
            bank.balance += difference; // since `difference` is negative, it will decrease the balance
        }

        await bank.save({ transaction });

        await transaction.commit();

        res.status(200).json({
            message: "Expense updated successfully, and bank balance updated.",
            expense,
            bank: {
                bankId: bank.bankId,
                newBalance: bank.balance,
            },
        });
    } catch (error) {
        if (transaction) await transaction.rollback();
        res.status(500).json({
            message: "Failed to update expense and update bank balance.",
            error: error.message,
        });
    }
};
