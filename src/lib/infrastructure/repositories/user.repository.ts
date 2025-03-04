import { Transaction, db } from "@/db";
import { roleTable } from "@/db/schema/role";
import { usersTable } from "@/db/schema/user";
import IUserRepository from "@/lib/application/repositories/user.repository.interface";
import { User } from "@/lib/entities/models/user.model";
import { eq } from "drizzle-orm";

export class UserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<User | null> {
        let [users] = await db
            .select()
            .from(usersTable)
            .leftJoin(roleTable, eq(usersTable.role_id, roleTable.id))
            .where(eq(usersTable.email, email));

        if (users) {
            return {
                id: users.users.id,
                name: users.users.name,
                email: users.users.email,
                password: users.users.password,
                role: users.roles?.role_name || "",
            };
        } else {
            return null;
        }
    }

    async findById(userId: string): Promise<User | null> {
        let [users] = await db
            .select()
            .from(usersTable)
            .leftJoin(roleTable, eq(usersTable.role_id, roleTable.id))
            .where(eq(usersTable.id, userId));

        if (users) {
            return {
                id: users.users.id,
                name: users.users.name,
                email: users.users.email,
                password: users.users.password,
                role: users.roles?.role_name || "",
            };
        } else {
            return null;
        }
    }

    async findByRole(role: string): Promise<User[]> {
        let result = await db
            .select({
                id: usersTable.id,
                name: usersTable.name,
                email: usersTable.email,
                password: usersTable.password,
                role: roleTable.role_name,
            })
            .from(usersTable)
            .leftJoin(roleTable, eq(usersTable.role_id, roleTable.id))
            .where(eq(roleTable.role_name, role));

        return result as User[];
    }

    async create(
        userData: User,
        role_id: number,
        tx?: Transaction
    ): Promise<void> {
        const invoker = tx ?? db;
        const userInsert = {
            ...userData,
            role_id,
        };
        await invoker.insert(usersTable).values(userInsert);
        return;
    }
}
