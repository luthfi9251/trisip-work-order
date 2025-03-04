import * as mysqlCore from "drizzle-orm/mysql-core";
import { timestamps } from "./column.helper";
import { usersTable } from "./user";
import { InferSelectModel } from "drizzle-orm";

export const sessionTable = mysqlCore.mysqlTable("session", {
    id: mysqlCore
        .varchar("id", {
            length: 255,
        })
        .primaryKey(),
    user_id: mysqlCore
        .varchar("user_id", { length: 255 })
        .notNull()
        .references(() => usersTable.id),
    expired_at: mysqlCore.datetime("expired_at").notNull(),
    ...timestamps,
});

export type Session = InferSelectModel<typeof sessionTable>;
