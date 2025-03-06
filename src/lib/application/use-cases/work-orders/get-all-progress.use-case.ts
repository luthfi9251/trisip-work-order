import {
    OperationalError,
    UnauthorizedError,
} from "@/lib/entities/errors/common";
import IUserRepository from "../../repositories/user.repository.interface";
import IWorkOrderRepository from "../../repositories/work-order.repository.interface";
import { UserRole } from "@/lib/entities/models/user.model";
import {
    WorkOrderProgress,
    WorkOrderRecord,
} from "@/lib/entities/models/work-order.model";

export class GetAllProgressUseCase {
    constructor(
        private userRepository: IUserRepository,
        private workOrderRepository: IWorkOrderRepository
    ) {}

    async execute(
        workOrderId: number,
        userId: string
    ): Promise<WorkOrderProgress[]> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new OperationalError("User id not found!");
        }

        const workOrder = await this.workOrderRepository.findById(workOrderId);
        if (!workOrder) {
            throw new OperationalError("Work order not found!");
        }

        const isProductionManager = user.role === UserRole.PRODUCTION_MANAGER;
        const isOperator = user.role === UserRole.OPERATOR;
        const isAssignedToUser = user.id === workOrder.assigned_to.id;

        if ((isAssignedToUser && isOperator) || isProductionManager) {
            return await this.workOrderRepository.getAllProgress(workOrderId);
        } else {
            throw new UnauthorizedError("You're unauthorize to get progress!");
        }
    }
}
