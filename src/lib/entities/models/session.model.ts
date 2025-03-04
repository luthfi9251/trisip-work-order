import { User } from "./user.model";

export interface Session {
    id: string;
    user_id: string;
    expired_at: Date;
}

export type SessionDTO = {
    session: Session | null;
    user: Omit<User, "password"> | null;
};
