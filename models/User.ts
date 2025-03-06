import { DataTypes } from "sequelize";
import { sequelize } from "../lib/db";


//user model
const User = sequelize.define(
  "User",
  {
    user_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    profile_pic: { type: DataTypes.STRING },
  },
  {
    tableName: "users",
    timestamps: false,
  },
);

export default User;
