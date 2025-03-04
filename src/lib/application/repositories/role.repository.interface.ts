import { Transaction } from "@/db";

export default interface IRoleRepository {
    create(role_name: string, tx?: Transaction): Promise<number>;
}
