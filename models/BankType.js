import { DataTypes } from 'sequelize';

const BankType = (sequelize) => {
    const BankTypeModel = sequelize.define('bankType', {
        bankTypeId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        names: {
            type: DataTypes.STRING,
            allowNull: false,
        },
  
        discription: {
            type: DataTypes.STRING,
            allowNull: true,
        },
     
    }, {
        timestamps: true, 
    });

    return BankTypeModel;
};

export default BankType;