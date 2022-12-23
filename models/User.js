import sequelize from "sequelize";
import { hash, compareSync } from "bcrypt";
import { sequelize as connection } from "../config/connection.js";

const { INTEGER, STRING } = sequelize.DataTypes;

const User = connection.define(
  "User",
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: STRING,
      allowNull: false
    },
    password: {
      type: STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    }
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "User"
  }
);

User.prototype.checkPassword = function (inputPass) {
  return compareSync(inputPass, this.password);
};

export { User };
