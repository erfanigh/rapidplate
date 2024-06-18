import { DataTypes, Model } from 'sequelize'
import sequelize from '../config.js';

export interface T_AdminUser {
    userId: number;
    email: string;
    name: string;
    password: string;
    createdAt: Date,
    updatedAt: Date,
}

export interface AdminUsersAttributes extends T_AdminUser {}
export type AdminUsersCreationAttributes = AdminUsersAttributes;
export class AdminUsers extends Model<AdminUsersAttributes, AdminUsersCreationAttributes> {}

AdminUsers.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: new DataTypes.STRING(255),
            unique: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(255),
        },
        password: {
            type: new DataTypes.STRING(255),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'admin_users',
        modelName: 'AdminUsers',
    }
)