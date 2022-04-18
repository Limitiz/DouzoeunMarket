module.exports = (sequelize, DataTypes) => {

    const ProductImg = sequelize.define("Users", {
        idx: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nickName: {
            type: DataTypes.STRING(15),
        },
        phoneNUm: {
            type: DataTypes.STRING(13),
        },
        img : {
            type: DataTypes.img
        },
        rate : {
            type: DataTypes.DEMICAL(2,1),
            defaultValue: 0.0
        },
        point : {
            type: DataTypes.INT
        },
        zipCode: {
            type: DataTypes.CHAR(5)
        },
        address : DataTypes.STRING(30)

    }, 
    
    //Model 옵션 정의
    {
        charset: "utf8", 
        collate: "utf8_general_ci", 
        tableName: "Users", 
        timestamps: false, 
        paranoid: true, 
    });

    User.associate = models => {
        User.belongsTo(models.Product, {foreignKey:"seller", sourceKey:"idx"});
        User.belongsTo(models.Comment, {foreignKey:"reciever", sourceKey:"idx"});
        User.belongsTo(models.Commnet, {foreignKey:"writer", sourceKey:"idx"});
        User.belongsTo(models.Favorite, {foreignKey:"userId", sourceKey:"idx"});
        User.belongsTo(models.ChatRoom, {foreignKey:"seller", sourceKey:"idx"});
        User.belongsTo(models.ChatRoom, {foreignKey:"buyer", sourceKey:"idx"});
        User.belongsTo(models.ChatMessage, {foreignKey:"sender", sourceKey:"idx"});
    }

    return Users;
};