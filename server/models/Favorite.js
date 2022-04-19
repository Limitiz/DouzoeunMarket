import sequelize from './sq.js';
import Product from './Product.js';
import User from './User.js';

    const Favorite = sequelize.define("Favorite", {},
    //Model 옵션 정의
    {
        charset: "utf8", 
        collate: "utf8_general_ci", 
        tableName: "Favorite", 
        timestamps: false, 
        paranoid: true, 
    });

    Favorite.associate = () => {
        Favorite.belongsTo(Product, {foreignKey: "productId", sourceKey:"idx", primaryKey:true});
        Favorite.belongsTo(User, {foreignKey:"userId", sourceKey:"idx"});
   }


export default Favorite;