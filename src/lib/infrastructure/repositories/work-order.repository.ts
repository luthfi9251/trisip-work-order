import { Transaction, db } from "@/db";
import { workOrderTable } from "@/db/schema/work-order";
import IWorkOrderRepository from "@/lib/application/repositories/work-order.repository.interface";
import {
    WorkOrderCreateDTO,
    WorkOrderRecord,
} from "@/lib/entities/models/work-order.model";
import { endOfDay, parseISO, startOfDay } from "date-fns";
import { and, desc, eq, gte, lt } from "drizzle-orm";

export default class WorkOrderRepository implements IWorkOrderRepository {
    async create(
        workOrder: WorkOrderRecord,
        tx?: Transaction | undefined
    ): Promise<void> {
        const invoker = tx ?? db;
        await invoker.insert(workOrderTable).values({
            wo_num: workOrder.wo_num,
            product_name: workOrder.product_name,
            quantity: workOrder.quantity,
            deadline: workOrder.deadline,
            assigned_to: workOrder.assigned_to,
            created_by: workOrder.created_by,
        });
    }
    async findLatestByDate(date: string): Promise<WorkOrderRecord | null> {
        const parsedDate = parseISO(date); // Mengubah string menjadi objek Date
        const start = startOfDay(parsedDate);
        const end = endOfDay(parsedDate);

        let [result] = await db
            .select()
            .from(workOrderTable)
            .where(
                and(
                    gte(workOrderTable.created_at, start),
                    lt(workOrderTable.created_at, end)
                )
            )
            .orderBy(desc(workOrderTable.created_at))
            .limit(1);

        if (result) {
            return result as WorkOrderRecord;
        } else {
            return null;
        }
    }
}
