import * as mysqlCore from "drizzle-orm/mysql-core";
import { timestamps } from "./column.helper";

export const roleTable = mysqlCore.mysqlTable("roles", {
    id: mysqlCore.int().autoincrement().primaryKey(),
    role_name: mysqlCore.varchar({ length: 100 }).unique().notNull(),

    ...timestamps,
});
