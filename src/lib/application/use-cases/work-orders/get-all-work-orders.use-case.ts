import { OperationalError } from "@/lib/entities/errors/common";
import IUserRepository from "../../repositories/user.repository.interface";
import IWorkOrderRepository from "../../repositories/work-order.repository.interface";
import { UserRole } from "@/lib/entities/models/user.model";
import { WorkOrder } from "@/lib/entities/models/work-order.model";

export class GetAllWorkOrderUseCase {
    constructor(
        private userRepository: IUserRepository,
        private workOrderRepository: IWorkOrderRepository
    ) {}

    async execute(userId: string): Promise<WorkOrder[]> {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new OperationalError("User id not found!");
        }

        let roleUser = user.role;
        let workOrders = [];

        if (roleUser === UserRole.PRODUCTION_MANAGER) {
            workOrders = await this.workOrderRepository.getAll();
        } else {
            workOrders = await this.workOrderRepository.getAll(user.id);
        }

        return workOrders;
    }
}
