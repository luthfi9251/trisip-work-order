import { SignInUserUseCase } from "@/lib/application/use-cases/users/sign-in.use-case";
import { InputParsedError } from "@/lib/entities/errors/common";
import { LoginUserDTO } from "@/lib/entities/models/user.model";
import { SessionRepository } from "@/lib/infrastructure/repositories/session.repository";
import { UserRepository } from "@/lib/infrastructure/repositories/user.repository";
import { AuthenticationService } from "@/lib/infrastructure/services/authentication.service";
import { PasswordService } from "@/lib/infrastructure/services/password.service";
import { z } from "zod";

//repository initialization
const userRepository = new UserRepository();
const sessionRepository = new SessionRepository();

//service initialization
const authenticationService = new AuthenticationService(
    sessionRepository,
    userRepository
);
const passwordService = new PasswordService();

//use case initialization
const signInUserUseCase = new SignInUserUseCase(
    userRepository,
    authenticationService,
    passwordService
);

//schema validation
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const signInController = async (userCredential: LoginUserDTO) => {
    const parsedUserCred = loginSchema.safeParse(userCredential);

    if (!parsedUserCred.success) {
        const errorField = {
            ...parsedUserCred.error?.flatten().fieldErrors,
        };
        throw new InputParsedError("Invalid Input", errorField);
    }

    return await signInUserUseCase.execute(
        parsedUserCred.data.email,
        parsedUserCred.data.password
    );
};
