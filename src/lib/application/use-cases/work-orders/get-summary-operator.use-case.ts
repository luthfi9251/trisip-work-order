import {
    OperationalError,
    UnauthorizedError,
} from "@/lib/entities/errors/common";
import IUserRepository from "../../repositories/user.repository.interface";
import IWorkOrderRepository from "../../repositories/work-order.repository.interface";
import { UserRole } from "@/lib/entities/models/user.model";

export class GetSummaryOperatorUseCase {
    constructor(
        private userRepository: IUserRepository,
        private workOrderRepository: IWorkOrderRepository
    ) {}

    async execute(userId: string) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new OperationalError("User id not found!");
        }

        const isProductionManager = user.role === UserRole.PRODUCTION_MANAGER;

        if (!isProductionManager) {
            throw new UnauthorizedError(
                "Youre unauthorize to get info summary!"
            );
        }

        let summary = await this.workOrderRepository.getSummaryWOOperator();
        return summary;
    }
}
