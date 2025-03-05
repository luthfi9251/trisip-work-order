import { Transaction } from "@/db";
import {
    WorkOrder,
    WorkOrderCreateDTO,
    WorkOrderInputRecord,
    WorkOrderRecord,
    WorkOrderUpdateRecord,
} from "@/lib/entities/models/work-order.model";

export default interface IWorkOrderRepository {
    create(workOrder: WorkOrderInputRecord, tx?: Transaction): Promise<void>;
    findLatestByDate(date: string): Promise<WorkOrderRecord | null>;
    getAll(assigned_to?: string): Promise<WorkOrderRecord[]>;
    findById(id: number): Promise<WorkOrder | null>;
    update(
        idWorkOrder: number,
        workOrder: Partial<WorkOrderUpdateRecord>,
        tx?: Transaction
    ): Promise<void>;
}
