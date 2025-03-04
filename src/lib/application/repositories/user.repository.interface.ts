import { Transaction } from "@/db";
import { User } from "@/lib/entities/models/user.model";

export default interface IUserRepository {
    create(data: User, role_id: number, tx?: Transaction): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findByRole(role: string): Promise<User[]>;
}
