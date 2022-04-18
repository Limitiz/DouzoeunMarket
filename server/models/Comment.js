module.exports = (sequelize, DataTypes) => {

    const Comment = sequelize.define("Comment", {
        idx: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        content:{
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

    Comment.associate = models => {
        Comment.hasOne(models.User, {foreignKey: "reciever", sourceKey:"idx"});
        Comment.hasOne(models.User, {foreignKey: "writer", sourceKey:"idx"});
        Comment.hasOne(models.Product, {foreignKey: "productId", sourceKey:"idx"});
    }

    return Comment;
};