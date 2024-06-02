import { T_KeyAsPropNameMap } from '../../../shared/types/T_KeyAsPropNameMap.js';
import { pgTable, serial, varchar } from 'drizzle-orm/pg-core';
import { T_User } from '../../../shared/types/T_User.js';

export const usersModel = pgTable('users', {
    usr_id: serial('usr_id').primaryKey().notNull(),
    usr_password: varchar('usr_password', { length: 32 }).notNull(),
    usr_username: varchar('usr_username', { length: 256 }).notNull().unique(),
    usr_refresh_token: varchar('usr_refresh_token', { length: 256 }).notNull(),
} as T_KeyAsPropNameMap<T_User>);