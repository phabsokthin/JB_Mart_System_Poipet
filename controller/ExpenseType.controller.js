import { where } from "sequelize";
import db  from "../config/config.js";
const ExpenseType = db.ExpenseType


export const createExpenseType = async (req, res) => {
    try {
        // Extract data from the request body
        const { names, description } = req.body;

        // Validate input data
        if (!names || names.trim() === '') {
            return res.status(400).json({ msg: 'The "names" field is required.' });
        }

        // Create a new expense type record
        const newExpenseType = await ExpenseType.create({
            names,
            description,
        });

        // Send a success response
        return res.status(201).json({
            msg: 'Expense type created successfully.',
            data: newExpenseType,
        });
    } catch (error) {
        console.error('Error creating expense type:', error);

        // Handle any errors and send an appropriate response
        return res.status(500).json({
            msg: 'An error occurred while creating the expense type.',
            error: error.msg,
        });
    }
}

export const fetchExpenseType = async (req, res) => {

    try{
        const data = await ExpenseType.findAll()
        return res.status(200).json(data)
    }
    catch(err){
        console.log(err)
    }
}



export const updateExpenseType = async (req, res) => {
    try {
        // Extract data from the request body and params
        const { names, description } = req.body;
        const { id } = req.params;

        // Validate input data
        if (!id) {
            return res.status(400).json({ msg: 'The "id" parameter is required.' });
        }
        if (!names || names.trim() === '') {
            return res.status(400).json({ msg: 'The "names" field is required.' });
        }

        // Update the expense type record
        const [updatedRows] = await ExpenseType.update(
            { names, description },
            {
                where: { expenseTypeId: id },
            }
        );

        // Check if the record was updated
        if (updatedRows === 0) {
            return res.status(404).json({ msg: 'Expense type not found or no changes made.' });
        }

        // Retrieve the updated record
        const updatedExpenseType = await ExpenseType.findByPk(id);

        // Send a success response
        return res.status(200).json({
            msg: 'Expense type updated successfully.',
            data: updatedExpenseType,
        });
    } catch (error) {
        console.error('Error updating expense type:', error);

        // Handle any errors and send an appropriate response
        return res.status(500).json({
            msg: 'An error occurred while updating the expense type.',
            error: error.msg,
        });
    }
};


export const deleteExpenseType = async (req, res) => {
    try {
        // Extract the id from the request params
        const { id } = req.params;

        // Validate input data
        if (!id) {
            return res.status(400).json({ msg: 'The "id" parameter is required.' });
        }

        // Delete the expense type record
        const deletedRows = await ExpenseType.destroy({
            where: { expenseTypeId: id },
        });

        // Check if the record was deleted
        if (deletedRows === 0) {
            return res.status(404).json({ msg: 'Expense type not found.' });
        }

        // Send a success response
        return res.status(200).json({
            msg: 'Expense type deleted successfully.',
        });
    } catch (error) {
        console.error('Error deleting expense type:', error);

        // Handle any errors and send an appropriate response
        return res.status(500).json({
            msg: 'An error occurred while deleting the expense type.',
            error: error.msg,
        });
    }
};