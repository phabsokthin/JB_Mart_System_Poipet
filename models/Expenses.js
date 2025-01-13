import { DataTypes } from 'sequelize';

const Expense = (sequelize) => {
    const ExpenseModel = sequelize.define('expense', {
        expenseId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        expenseTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        total: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        paymentAmount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },


        totalAmount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },


        expenseDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },


        // paymentMId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },


        bankId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        
        // currencyId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },

        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
     
    }, {
        timestamps: true, 
    });

    return ExpenseModel;
};

export default Expense;