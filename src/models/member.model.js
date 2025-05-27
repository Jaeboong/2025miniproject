// src/members/member.model.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Member = sequelize.define(
    "Member",
    {
      member_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      modified_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "members", // 실제 DB 테이블 이름
      timestamps: false, // createdAt, updatedAt 자동 관리 사용 안 함
    }
  );

  return Member;
};
