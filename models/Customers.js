import { DataTypes } from 'sequelize';

const Customer = (sequelize) => {
    const CustomerModel = sequelize.define('customer', {
        customerId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        customer_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        full_Name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
           
        },
        address:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        description:{
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        timestamps: true, 
    });

    return CustomerModel;
};

export default Customer;