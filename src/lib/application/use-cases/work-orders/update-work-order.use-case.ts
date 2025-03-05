import { WorkOrderUpdateRecord } from "@/lib/entities/models/work-order.model";
import IUserRepository from "../../repositories/user.repository.interface";
import IWorkOrderRepository from "../../repositories/work-order.repository.interface";
import {
    OperationalError,
    UnauthorizedError,
} from "@/lib/entities/errors/common";
import { UserRole } from "@/lib/entities/models/user.model";

export class UpdateWorkOrderUseCase {
    constructor(
        private userRepository: IUserRepository,
        private workOrderRepository: IWorkOrderRepository
    ) {}

    async execute(workOrderData: WorkOrderUpdateRecord, userId: string) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new OperationalError("User id not found!");
        }

        if (user.role === UserRole.OPERATOR) {
            throw new UnauthorizedError(
                "Youre unauthorize to do work order update"
            );
        }

        const updatedData: Partial<WorkOrderUpdateRecord> = {
            product_name: workOrderData.product_name,
            deadline: workOrderData.deadline,
            quantity: workOrderData.quantity,
            status: workOrderData.status,
            assigned_to: workOrderData.assigned_to,
        };

        await this.workOrderRepository.update(workOrderData.id, updatedData);
    }
}
