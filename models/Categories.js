import { DataTypes } from 'sequelize';

const Category = (sequelize) => {
    const CategoryModel = sequelize.define('category', {
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        cnames: {
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

    return CategoryModel;
};

export default Category;