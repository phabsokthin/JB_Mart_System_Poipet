import { DataTypes } from 'sequelize';

const Bank = (sequelize) => {
    const BankModel = sequelize.define('bank', {
        bankId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        bankTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        bankNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bankName: {
            type: DataTypes.STRING,
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

    return BankModel;
};

export default Bank;