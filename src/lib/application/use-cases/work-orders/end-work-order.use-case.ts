import {
    OperationalError,
    UnauthorizedError,
} from "@/lib/entities/errors/common";
import IUserRepository from "../../repositories/user.repository.interface";
import IWorkOrderRepository from "../../repositories/work-order.repository.interface";
import { UserRole } from "@/lib/entities/models/user.model";

export class EndWorkOrderUseCase {
    constructor(
        private userRepository: IUserRepository,
        private workOrderRepository: IWorkOrderRepository
    ) {}

    async execute(workOrderId: number, final_quantity: number, userId: string) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new OperationalError("User id not found!");
        }

        const workOrder = await this.workOrderRepository.findById(workOrderId);
        if (!workOrder) {
            throw new OperationalError("Work order not found!");
        }

        const isWorkOrderInProgress = workOrder.status === "IN_PROGRESS";
        if (!isWorkOrderInProgress) {
            throw new OperationalError(
                "Work order cannot be end, because it not in Progress status"
            );
        }

        const isOperator = user.role === UserRole.OPERATOR;
        const isAssignedToUser = user.id === workOrder.assigned_to.id;

        if (isAssignedToUser && isOperator) {
            await this.workOrderRepository.update(workOrderId, {
                status: "COMPLETED",
                result_quantity: final_quantity,
            });
            return workOrder;
        } else {
            throw new UnauthorizedError(
                "You're unauthorize to end work order!"
            );
        }
    }
}
