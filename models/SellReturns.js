import { DataTypes } from 'sequelize';

const SellReturn = (sequelize) => {
    const SellReturnModel = sequelize.define('saleReturn', {
        saleReturnID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        sellId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        qty: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        totalAmount: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        paymentAmount: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
  
        balance: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        saleReturnDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
       
    }, {
        timestamps: true, 
    });

    return SellReturnModel;
};

export default SellReturn;