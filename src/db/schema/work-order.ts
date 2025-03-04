import * as mysqlCore from "drizzle-orm/mysql-core";
import { timestamps, softDeletes } from "./column.helper";
import { usersTable } from "./user";

export const workOrderTable = mysqlCore.mysqlTable("work_orders", {
    id: mysqlCore.int().autoincrement().primaryKey(),
    wo_num: mysqlCore.varchar({ length: 50 }).unique().notNull(),
    product_name: mysqlCore.varchar({ length: 255 }).notNull(),
    quantity: mysqlCore.int().notNull(),
    deadline: mysqlCore.datetime().notNull(),
    status: mysqlCore
        .mysqlEnum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELED"])
        .default("PENDING")
        .notNull(),
    assigned_to: mysqlCore
        .varchar("assigned_to_id", { length: 255 })
        .references(() => usersTable.id)
        .notNull(),
    created_by: mysqlCore
        .varchar("created_by_id", { length: 255 })
        .references(() => usersTable.id)
        .notNull(),
    ...timestamps,
    ...softDeletes,
});

export const workOrderProgressTable = mysqlCore.mysqlTable(
    "work_order_progress",
    {
        id: mysqlCore.int().autoincrement().primaryKey(),
        date: mysqlCore.datetime().notNull(),
        report_by: mysqlCore
            .varchar("report_by_user_id", { length: 255 })
            .references(() => usersTable.id)
            .notNull(),
        work_order_id: mysqlCore
            .int()
            .references(() => workOrderTable.id)
            .notNull(),
        description: mysqlCore.text().notNull(),
        ...timestamps,
    }
);

export const workOrderBatchTable = mysqlCore.mysqlTable("work_order_batches", {
    id: mysqlCore.int().autoincrement().primaryKey(),
    work_order_id: mysqlCore
        .int()
        .references(() => workOrderTable.id)
        .notNull(),
    batch_no: mysqlCore.varchar({ length: 50 }).unique().notNull(),
    quantity: mysqlCore.int().notNull(),
    status: mysqlCore
        .mysqlEnum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELED"])
        .default("PENDING")
        .notNull(),
    created_by: mysqlCore
        .varchar("created_by_id", { length: 255 })
        .references(() => usersTable.id)
        .notNull(),
    ...timestamps,
    ...softDeletes,
});
