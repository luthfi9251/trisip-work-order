import { Session } from "@/lib/entities/models/session.model";

export interface ISessionRepository {
    findBySessionId(sessionId: string): Promise<Session | null>;
    insertSession(sessionData: Session): Promise<Boolean>;
    deleteSession(sessionId: string): Promise<void>;
    updateSession(sessionData: Session): Promise<void>;
}
