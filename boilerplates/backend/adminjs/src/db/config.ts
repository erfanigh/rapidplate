import { env } from "process";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    env.DATABASE_NAME,
    env.DATABASE_USER, 
    env.DATABASE_PASSWORD,
    {
        host: env.DATABASE_HOST,
        dialect: 'postgres'
    }
);

export default sequelize;
