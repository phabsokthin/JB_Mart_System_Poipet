import { DataTypes } from 'sequelize';

const Brand = (sequelize) => {
    const BrandModel = sequelize.define('brand', {
        brandId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        bnames: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
     
    }, {
        timestamps: true, 
    });

    return BrandModel;
};

export default Brand;