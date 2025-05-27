// src/members/member.model.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Member = sequelize.define(
    "Member",
    {
      memberId: {
        type: DataTypes.INTEGER,
        field: "member_id", // DB 컬럼명
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
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      modifiedAt: {
        type: DataTypes.DATE,
        field: "modified_at",
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "members", // 실제 DB 테이블 이름
      timestamps: false, // Sequelize 자동 타임스탬프 비활성화
    }
  );

  return Member;
};
