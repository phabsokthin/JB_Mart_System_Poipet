import { DataTypes } from 'sequelize';

const BankTransfer = (sequelize) => {
    const BankTransferModel = sequelize.define('bankTransfer', {
        bankTransId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        bankId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        note: {
            type: DataTypes.STRING,
            allowNull: true,
        },
     
    }, {
        timestamps: true, 
    });

    return BankTransferModel;
};

export default BankTransfer;