module.exports = (sequelize, DataTypes) => {

    const ChatMessage = sequelize.define("ChatMessage", {
        idx: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        message:{
            type: DataTypes.TEXT
        },
        status:{
            typs: DataTypes.STRING(1),
            defaultValue: "N"
        }

    }, 
    
    //Model 옵션 정의
    {
        charset: "utf8", 
        collate: "utf8_general_ci", 
        tableName: "ChatMessage", 
        timestamps: true, 
        createdAt: true,
        updatedAt: false,
        paranoid: true, 
    });

    ChatMessage.associate = models => {
        ChatMessage.hasMany(models.ChatRoom, {foreignKey: "roomId", sourceKey:"idx"});
        ChatMessage.belongsTo(models.User, {foreignKey:"sender", sourceKey:"idx"});
    }

    return ChatRoom;
};