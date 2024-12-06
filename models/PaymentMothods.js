import { DataTypes } from 'sequelize';

const PaymentMethod = (sequelize) => {
    const PaymentMethodModel = sequelize.define('paymentmethod', {
        paymentMId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        names: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        note: {
            type: DataTypes.STRING,
            allowNull: true,
        },
     
    }, {
        timestamps: true, 
    });

    return PaymentMethodModel;
};

export default PaymentMethod;