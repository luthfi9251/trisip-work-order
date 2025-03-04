import { UserRole } from "@/lib/entities/models/user.model";
import IUserRepository from "../../repositories/user.repository.interface";

export class GetOperatorUseCase {
    constructor(private userRepository: IUserRepository) {}
    async execute() {
        let operators = await this.userRepository.findByRole(UserRole.OPERATOR);
        return operators;
    }
}
