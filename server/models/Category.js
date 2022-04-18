module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define("Category", {
        idx: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name:{
            type: DataTypes.STRING(16),
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

    category.associate = models => {
        Category.belongsTo(models.Product, {foreignKey: "categoryId", sourceKey:"idx"});

    }

    return Category;
};