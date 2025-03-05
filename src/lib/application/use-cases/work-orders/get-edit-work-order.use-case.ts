import {
    OperationalError,
    UnauthorizedError,
} from "@/lib/entities/errors/common";
import IUserRepository from "../../repositories/user.repository.interface";
import IWorkOrderRepository from "../../repositories/work-order.repository.interface";
import { UserRole } from "@/lib/entities/models/user.model";
import {
    WorkOrder,
    WorkOrderRecord,
} from "@/lib/entities/models/work-order.model";

export class GetEditWorkOrderUseCase {
    constructor(
        private userRepository: IUserRepository,
        private workOrderRepository: IWorkOrderRepository
    ) {}

    async execute(idWorkOrder: number, userId: string): Promise<WorkOrder> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new OperationalError("User id not found!");
        }
        let roleUser = user.role;
        if (roleUser === UserRole.OPERATOR) {
            throw new UnauthorizedError(
                "You have no access to edit work order!"
            );
        }

        let result = await this.workOrderRepository.findById(idWorkOrder);
        if (!result) {
            throw new OperationalError("Work Order not found!");
        }

        return result;
    }
}
