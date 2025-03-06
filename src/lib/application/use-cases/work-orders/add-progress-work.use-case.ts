import { WorkOrderProgressInput } from "@/lib/entities/models/work-order.model";
import IUserRepository from "../../repositories/user.repository.interface";
import IWorkOrderRepository from "../../repositories/work-order.repository.interface";
import {
    OperationalError,
    UnauthorizedError,
} from "@/lib/entities/errors/common";
import { UserRole } from "@/lib/entities/models/user.model";

export class AddProgressWorkUseCase {
    constructor(
        private userRepository: IUserRepository,
        private workOrderRepository: IWorkOrderRepository
    ) {}

    async execute(progressData: WorkOrderProgressInput, userId: string) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new OperationalError("User id not found!");
        }

        const workOrder = await this.workOrderRepository.findById(
            progressData.work_order_id
        );
        if (!workOrder) {
            throw new OperationalError("Work order not found!");
        }

        const isWorkOrderInProgress = workOrder.status === "IN_PROGRESS";
        if (!isWorkOrderInProgress) {
            throw new OperationalError(
                "Cannot add progress, because work order not in progress status"
            );
        }

        const isOperator = user.role === UserRole.OPERATOR;
        const isAssignedToUser = user.id === workOrder.assigned_to.id;

        if (isAssignedToUser && isOperator) {
            return await this.workOrderRepository.createProgress(
                progressData,
                userId
            );
        } else {
            throw new UnauthorizedError("You're unauthorize to add progress!");
        }
    }
}
