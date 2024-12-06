import { DataTypes } from 'sequelize';

const Unit = (sequelize) => {
    const UnitModel = sequelize.define('unit', {
        unitId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        unames: {
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

    return UnitModel;
};

export default Unit;