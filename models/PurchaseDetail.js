import { DataTypes } from 'sequelize';

const PurchaseDetail = (sequelize) => {
    const PurchaseDetailModel = sequelize.define('purchaseDetails', {
        purchaseDetailId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        purchaseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        
        qty: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cost_price: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
    }, {
        timestamps: true,
    });

    return PurchaseDetailModel;
};

export default PurchaseDetail;
