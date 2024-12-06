import { DataTypes } from 'sequelize';

const Sell = (sequelize) => {
    const SellModel = sequelize.define('sell', {
        sellId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        sellNo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        qty: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },


        sellPrice: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        total: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        discount: {
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

        balace: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        sellDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },

        currencyId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        paymentMId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        bankId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
     
    }, {
        timestamps: true, 
    });

    return SellModel;
};

export default Sell;