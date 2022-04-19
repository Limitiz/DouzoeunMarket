import DataTypes from 'sequelize';
import sequelize from './sq.js';
import User from './User.js';
import ProductImg from './ProductImg.js';
import ChatRoom from './ChatRoom.js';
import Category from './Category.js';
import Favorite from './Favorite.js';


const Product = sequelize.define("Product", {
        idx: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        status: {
            type: DataTypes.STRING(1),
            defaultValue: "N",
        },
        title: {
            type: DataTypes.STRING(20)
        },
        price: {
            type: DataTypes.INTEGER,
        },
        content: {
            type: DataTypes.STRING(2000)
        },
        locationX:{
            type: DataTypes.STRING
        },
        locationY:{
            type:DataTypes.STRING
        }
    }, 
    
    //Model 옵션 정의
    {
        charset: "utf8", 
        collate: "utf8_general_ci", 
        tableName: "Product", 
        timestamps: true, 
        paranoid: true, 
    });

    Product.associate = () => {
        Product.belongsTo(User, {foreignKey: "seller", sourceKey:"idx"});
        Product.hasMany(ProductImg, {foreignKey:"productId", sourceKey:"idx"});
        Product.belongsTo(Category, {foreignKey:"categoryId", sourceKey:"idx"});
        Product.hasOne(Favorite, {foreignKey:"productId", sourceKey:"idx"});
        Product.hasOne(ChatRoom, {foreignKey:"productId", sourceKey:"idx"});
    }

export default Product;