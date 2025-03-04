import { AuthenticationService } from "@/lib/infrastructure/services/authentication.service";
import IUserRepository from "../../repositories/user.repository.interface";
import IPasswordService from "../../services/password.service.interface";
import { SessionDTO } from "@/lib/entities/models/session.model";
import { AuthenticationError } from "@/lib/entities/errors/common";

export class SignInUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private authenticationService: AuthenticationService,
        private passwordService: IPasswordService
    ) {}

    async execute(email: string, password: string): Promise<string> {
        // lakukan cek apakah ada user dengan email bersangkutan
        const errorMessage =
            "Sorry, your account not found or Password didn't match!";

        let findUser = await this.userRepository.findByEmail(email);
        if (!findUser) {
            throw new AuthenticationError(errorMessage);
        }

        //lakukan komparasi password
        const isPasswordValid = this.passwordService.comparePassword(
            password,
            findUser.password
        );
        if (!isPasswordValid) {
            throw new AuthenticationError(errorMessage);
        }

        //create session menggunakan authservice
        let token = this.authenticationService.generateSessionToken();
        await this.authenticationService.createSession(token, findUser.id);

        return token;
    }
}
