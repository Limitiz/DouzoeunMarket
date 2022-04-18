module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("Product", {
        idx: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
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
            type: DataTypes.INT,
        },
        content: {
            type: DataTypes.TEXT
        }
    }, 
    
    //Model 옵션 정의
    {
        charset: "utf8", 
        collate: "utf8_general_ci", 
        tableName: "Users", 
        timestamps: true, 
        paranoid: true, 
    });

    Product.associate = models => {
        Product.hasOne(models.User, {foreignKey: "seller", sourceKey:"idx"});
        Product.belongsTo(models.ProductImg, {foreignKey:"productId", sourceKey:"idx"});
        Product.hasOne(models.Category, {foreignKey:"categoryId", sourceKey:"idx"});
        Product.belongsTo(models.Favorite, {foreignKey:"productId", sourceKey:"idx"});
        Product.belongsTo(models.ChatRoom, {foreignKey:"productId", sourceKey:"idx"});
    }

    return Product;
};