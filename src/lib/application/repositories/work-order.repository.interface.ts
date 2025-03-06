import { Transaction } from "@/db";
import {
    WorkOrder,
    WorkOrderCreateDTO,
    WorkOrderInputRecord,
    WorkOrderProgress,
    WorkOrderProgressInput,
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
    createProgress(
        progress: WorkOrderProgressInput,
        report_by: string,
        tx?: Transaction
    ): Promise<void>;
    getAllProgress(workOrderId: number): Promise<WorkOrderProgress[]>;
}
