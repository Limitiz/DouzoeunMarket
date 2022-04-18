module.exports = (sequelize, DataTypes) => {

    const Favorite = sequelize.define("Favorite", {
        idx: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        }
    }, 
    
    //Model 옵션 정의
    {
        charset: "utf8", 
        collate: "utf8_general_ci", 
        tableName: "Users", 
        timestamps: false, 
        paranoid: true, 
    });

    Favorite.associate = models => {
        Favorite.hasOne(models.Product, {foreignKey: "productId", sourceKey:"idx"});
        Favorite.hasOne(models.User, {foreignKey:"userId", sourceKey:"idx"});
   }

    return Favorite;
};