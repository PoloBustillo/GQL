import Sequelize from "sequelize";
import bcrypt from "bcryptjs";

class staffs extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        staff_id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        first_name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        last_name: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: "UQ__staffs__AB6E61641A16F662",
        },
        phone: {
          type: DataTypes.STRING(25),
          allowNull: true,
        },
        active: {
          type: DataTypes.TINYINT,
          allowNull: false,
        },
        store_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "stores",
            key: "store_id",
          },
        },
        password: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        manager_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: "staffs",
            key: "staff_id",
          },
        },
      },
      {
        hooks: {
          beforeSave: async (staff, options) => {
            if (staff._changed.has("password")) {
              staff.password = bcrypt.hashSync(
                staff.password,
                bcrypt.genSaltSync(10)
              );
            }
          },
        },
        sequelize,
        tableName: "staffs",
        schema: "sales",
        timestamps: false,
        indexes: [
          {
            name: "PK__staffs__1963DD9C97622FFF",
            unique: true,
            fields: [{ name: "staff_id" }],
          },
          {
            name: "UQ__staffs__AB6E61641A16F662",
            unique: true,
            fields: [{ name: "email" }],
          },
        ],
      }
    );
    return staffs;
  }
}

export default staffs;
