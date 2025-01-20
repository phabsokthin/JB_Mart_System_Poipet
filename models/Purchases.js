import { DataTypes } from 'sequelize';

const Purchase = (sequelize) => {
    const PurchaseModel = sequelize.define('purchase', {
        purchaseId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        purchaseNo: {
            type: DataTypes.INTEGER,
            allowNull: true,
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
            type: DataTypes.INTEGER,
            allowNull: true,
        },


        cost_price: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },


        qty: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
            
        include_tax: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        total: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        sell_price: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        discount: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        total_amount: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        payment_amount: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        
        balance: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        
        // currency_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },

        date_purchase: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        // payment_m_id: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        // },

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

    return PurchaseModel;
};

export default Purchase;