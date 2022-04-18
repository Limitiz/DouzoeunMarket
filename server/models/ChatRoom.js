module.exports = (sequelize, DataTypes) => {

    const ChatRoom = sequelize.define("ChatRoom", {
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
        timestamps: true, 
        paranoid: true, 
    });

    ChatRoom.associate = models => {
        ChatRoom.hasOne(models.User, {foreignKey: "seller", sourceKey:"idx"});
        ChatRoom.hasOne(models.User, {foreignKey:"buyer", sourceKey:"idx"});
        ChatRoom.hasOne(models.Product, {foreignKey:"prodcutId", sourceKey:"idx"});
        ChatRoom.belongsTo(models.ChatMessage, {foreignKey:"roomId", sourceKey:"idx"});
    }

    return ChatRoom;
};