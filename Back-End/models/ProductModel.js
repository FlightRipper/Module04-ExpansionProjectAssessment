import { DataTypes } from 'sequelize';
import sequelize from '../DataBaseConfig.js';
import User from './UserModel.js';

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    },
    {
        timestamps: true,
    }
);

User.hasMany(Product);
Product.belongsTo(User);

Product.sync();

export default Product;
