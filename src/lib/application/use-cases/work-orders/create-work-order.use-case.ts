import {
    WorkOrderCreateDTO,
    WorkOrderRecord,
} from "@/lib/entities/models/work-order.model";
import IWorkOrderRepository from "../../repositories/work-order.repository.interface";
import { SessionDTO } from "@/lib/entities/models/session.model";
import { UserRole } from "@/lib/entities/models/user.model";
import { UnauthorizedError } from "@/lib/entities/errors/common";
import { format } from "date-fns";

export class CreateWorkOrderUseCase {
    constructor(private workOrderRepository: IWorkOrderRepository) {}

    async execute(
        data: WorkOrderCreateDTO,
        session: SessionDTO
    ): Promise<string> {
        //only production manager are able to create work order
        if (session.user?.role !== UserRole.PRODUCTION_MANAGER) {
            throw new UnauthorizedError(
                "Only production manager are able to create work order!"
            );
        }

        //generate wo number
        const todayDate = new Date();
        const latestWorkOrderToday =
            await this.workOrderRepository.findLatestByDate(
                format(todayDate, "yyyy-MM-dd")
            );
        let currentJobNumber = 1;
        if (latestWorkOrderToday) {
            const lastNumber = parseInt(
                latestWorkOrderToday.wo_num.split("-").pop() || "0",
                10
            );
            currentJobNumber = lastNumber + 1;
        }
        const woNum = `WO-${format(todayDate, "yyyyMMdd")}-${String(
            currentJobNumber
        ).padStart(3, "0")}`;

        //save wo data
        const workOrderInsertData: WorkOrderRecord = {
            wo_num: woNum,
            status: data.status,
            deadline: data.deadline,
            product_name: data.product_name,
            quantity: data.quantity,
            assigned_to: data.assigned_to_id,
            created_by: session.user.id,
        };

        await this.workOrderRepository.create(workOrderInsertData);
        return woNum;
    }
}
