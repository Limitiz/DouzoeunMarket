import { DataTypes } from "sequelize";
import sequelize from "./sq.js";
import Product from "./Product.js";
import User from "./User.js";

const Order = sequelize.define(
    "Order",
    {
        idx: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        buyer : {
            type: DataTypes.INTEGER,
        },
        productId: {
            type: DataTypes.INTEGER,
        },
    },

    //Model 옵션 정의
    {
        charset: "utf8",
        collate: "utf8_general_ci",
        tableName: "Order",
        timestamps: false,
        paranoid: false,
    }
);

Order.associate = () => {
    Order.belongsTo(User, { foreignKey: "buyer", sourceKey: "idx" });
    Order.belongsTo(Product, { foreignKey: "productId", sourceKey: "idx" });
};

export default Order;
