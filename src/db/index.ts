import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { usersTable } from "./schema/user";
import { roleTable } from "./schema/role";
import {
    workOrderBatchTable,
    workOrderProgressTable,
    workOrderTable,
} from "./schema/work-order";
import {
    MySqlQueryResultHKT,
    MySqlTransaction,
    PreparedQueryHKTBase,
} from "drizzle-orm/mysql-core";
import { ExtractTablesWithRelations } from "drizzle-orm";

export const db = drizzle({
    connection: { uri: process.env.DATABASE_URL },
});

const schemaGroup = {
    ...usersTable,
    ...roleTable,
    ...workOrderBatchTable,
    ...workOrderProgressTable,
    ...workOrderTable,
};

export type Transaction = MySqlTransaction<
    MySqlQueryResultHKT,
    PreparedQueryHKTBase,
    typeof schemaGroup,
    ExtractTablesWithRelations<typeof schemaGroup>
>;
