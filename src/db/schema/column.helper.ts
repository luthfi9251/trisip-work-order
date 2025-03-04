import { timestamp } from "drizzle-orm/mysql-core";

export const timestamps = {
    updated_at: timestamp(),
    created_at: timestamp().defaultNow().notNull(),
    deleted_at: timestamp(),
};

export const softDeletes = {
    deleted_at: timestamp(),
};
