import { CreateUserDTO, User } from "@/lib/entities/models/user.model";
import IUserRepository from "../../repositories/user.repository.interface";
import IPasswordService from "../../services/password.service.interface";
import TransactionService from "@/lib/infrastructure/services/transaction.service";
import IRoleRepository from "../../repositories/role.repository.interface";
import { v4 as uuidv4 } from "uuid";

export default class CreateUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private roleRepository: IRoleRepository,
        private passwordService: IPasswordService,
        private transactionService: TransactionService
    ) {}

    async execute(data: CreateUserDTO): Promise<User> {
        const user = await this.userRepository.findByEmail(data.email);

        if (user) {
            throw new Error("User already exists");
        }

        const userId = uuidv4();
        const hashedPassword = this.passwordService.hashPassword(data.password);

        let newUser: User = {
            id: userId,
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role,
        };

        await this.transactionService.startTransaction(async (tx) => {
            return Promise.all([
                this.userRepository.create(newUser, tx),
                this.roleRepository.create(data.role, tx),
            ]);
        });

        return newUser;
    }
}
