import { DataTypes } from 'sequelize';

const Product = (sequelize) => {
    const ProductModel = sequelize.define('product', {
        productId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        pname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        unitId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        brandId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        pcode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: true,
        },
    
        qty: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        const_price: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        include_tax: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    
        total_amount: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        sell_price: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        profit: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        url: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        timestamps: true,
    });

    return ProductModel;
};

export default Product;
