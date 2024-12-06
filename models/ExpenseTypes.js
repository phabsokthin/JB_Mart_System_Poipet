import { DataTypes } from 'sequelize';

const ExpenseType = (sequelize) => {
    const ExpenseTypeModel = sequelize.define('expenseType', {
        expenseTypeId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        names: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
     
    }, {
        timestamps: true, 
    });

    return ExpenseTypeModel;
};

export default ExpenseType;