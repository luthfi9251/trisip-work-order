import * as mysqlCore from "drizzle-orm/mysql-core";
import { timestamps } from "./column.helper";
import { roleTable } from "./role";

export const usersTable = mysqlCore.mysqlTable("users", {
    id: mysqlCore.varchar("id", { length: 255 }).primaryKey(),
    name: mysqlCore.varchar("name", { length: 255 }).notNull(),
    email: mysqlCore.varchar({ length: 255 }).unique().notNull(),
    password: mysqlCore.varchar({ length: 255 }).notNull(),
    role_id: mysqlCore
        .int()
        .references(() => roleTable.id)
        .notNull(),
    ...timestamps,
});
