import { GetUserSessionUseCase } from "@/lib/application/use-cases/users/get-session.use-case";
import { SignOutUserUseCase } from "@/lib/application/use-cases/users/sign-out.use-case";
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
const signOutUserUseCase = new SignOutUserUseCase(authenticationService);

//schema validation
const tokenSchema = z.object({
    token: z.string(),
});

export const signOutUserController = async (token: string) => {
    const parsedSession = tokenSchema.safeParse({ token });

    if (!parsedSession.success) {
        const errorField = {
            ...parsedSession.error?.flatten().fieldErrors,
        };
        throw new InputParsedError("Invalid Input", errorField);
    }

    return await signOutUserUseCase.execute(parsedSession.data.token);
};
