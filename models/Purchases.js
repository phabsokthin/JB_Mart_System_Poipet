import { DataTypes } from 'sequelize';

const Purchase = (sequelize) => {
    const PurchaseModel = sequelize.define('purchase', {
        purchaseId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        supplierId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status_receive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

        cost_price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        qty: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        include_tax: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        total: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        discount: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        total_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        payment_amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
        currency_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        date_purchase: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        payment_m_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        bankId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    }, {
        timestamps: true,
    });

    return PurchaseModel;
};

export default Purchase;