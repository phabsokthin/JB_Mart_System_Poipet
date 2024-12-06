import { DataTypes } from 'sequelize';

const Supplier = (sequelize) => {
    const SupplierModel = sequelize.define('supplier', {
        supplierId: {
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

    return SupplierModel;
};

export default Supplier;