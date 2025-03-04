import { Transaction } from "@/db";
import {
    WorkOrder,
    WorkOrderCreateDTO,
    WorkOrderRecord,
} from "@/lib/entities/models/work-order.model";

export default interface IWorkOrderRepository {
    create(workOrder: WorkOrderRecord, tx?: Transaction): Promise<void>;

    findLatestByDate(date: string): Promise<WorkOrderRecord | null>;
}
