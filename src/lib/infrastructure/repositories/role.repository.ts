import { db } from "@/db";
import { roleTable } from "@/db/schema/role";
import IRoleRepository from "@/lib/application/repositories/role.repository.interface";

export default class RoleRepository implements IRoleRepository {
    async create(role_name: string): Promise<number> {
        let result = await db
            .insert(roleTable)
            .values({ role_name })
            .$returningId();
        return result[0].id;
    }
}
