module.exports = (sequelize, DataTypes) => {

    const ProductImg = sequelize.define("ProductImg", {
        idx: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        imgUrl:{
            type: DataTypes.STRING(255),
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

    Product.associate = models => {
        ProductImg.hasMany(models.Product, {foreignKey: "productId", sourceKey:"idx"});

        
    }

    return ProductImg;
};