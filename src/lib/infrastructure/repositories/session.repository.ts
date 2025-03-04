import { db } from "@/db";
import { sessionTable } from "@/db/schema/session";
import { ISessionRepository } from "@/lib/application/repositories/session.repository.interface";
import { Session } from "@/lib/entities/models/session.model";
import { eq } from "drizzle-orm";

export class SessionRepository implements ISessionRepository {
    async insertSession(sessionData: Session): Promise<Boolean> {
        try {
            await db.insert(sessionTable).values(sessionData);
            return true;
        } catch (err) {
            return false;
        }
    }
    async deleteSession(sessionId: string): Promise<void> {
        await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
        return;
    }

    async findBySessionId(sessionId: string): Promise<Session | null> {
        let session = await db
            .select()
            .from(sessionTable)
            .where(eq(sessionTable.id, sessionId));

        return session[0];
    }

    async updateSession(sessionData: Session): Promise<void> {
        await db
            .update(sessionTable)
            .set({
                expired_at: sessionData.expired_at,
            })
            .where(eq(sessionTable.id, sessionData.id));
        return;
    }
}
