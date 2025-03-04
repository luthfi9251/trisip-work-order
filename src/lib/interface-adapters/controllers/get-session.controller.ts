import { GetUserSessionUseCase } from "@/lib/application/use-cases/users/get-session.use-case";
import { InputParsedError } from "@/lib/entities/errors/common";
import { SessionRepository } from "@/lib/infrastructure/repositories/session.repository";
import { UserRepository } from "@/lib/infrastructure/repositories/user.repository";
import { AuthenticationService } from "@/lib/infrastructure/services/authentication.service";
import { z } from "zod";

//repository initialization
const userRepository = new UserRepository();
const sessionRepository = new SessionRepository();

//service initialization
const authenticationService = new AuthenticationService(
    sessionRepository,
    userRepository
);

//use case initialization
const getSessionUseCase = new GetUserSessionUseCase(authenticationService);

//schema validation
const sessionSchema = z.object({
    session_id: z.string(),
});

export const getUserSessionController = async (session_id: string) => {
    const parsedSession = sessionSchema.safeParse({ session_id });

    if (!parsedSession.success) {
        const errorField = {
            ...parsedSession.error?.flatten().fieldErrors,
        };
        throw new InputParsedError("Invalid Input", errorField);
    }

    return await getSessionUseCase.execute(parsedSession.data.session_id);
};
