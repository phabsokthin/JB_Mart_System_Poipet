import { DataTypes } from 'sequelize';

const Currency = (sequelize) => {
    const CurrencyModel = sequelize.define('currency', {
        currencyId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        currencyCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        currencyExchange: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        note: {
            type: DataTypes.STRING,
            allowNull: true,
        },
     
    }, {
        timestamps: true, 
    });

    return CurrencyModel;
};

export default Currency;