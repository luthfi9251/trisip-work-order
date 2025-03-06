import {
    OperationalError,
    UnauthorizedError,
} from "@/lib/entities/errors/common";
import IUserRepository from "../../repositories/user.repository.interface";
import IWorkOrderRepository from "../../repositories/work-order.repository.interface";
import { UserRole } from "@/lib/entities/models/user.model";

export class GetViewWorkOrderUseCase {
    constructor(
        private userRepository: IUserRepository,
        private workOrderRepository: IWorkOrderRepository
    ) {}

    async execute(workOrderId: number, userId: string) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new OperationalError("User id not found!");
        }

        const workOrder = await this.workOrderRepository.findById(workOrderId);
        if (!workOrder) {
            throw new OperationalError("Work order not found!");
        }

        const isProductionManager = user.role === UserRole.PRODUCTION_MANAGER;
        const isAssignedToUser = user.id === workOrder.assigned_to.id;

        if (isAssignedToUser || isProductionManager) {
            return workOrder;
        } else {
            throw new UnauthorizedError(
                "You're unauthorize to get work order data!"
            );
        }
    }
}
