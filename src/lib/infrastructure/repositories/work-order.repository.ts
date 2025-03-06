import { Transaction, db } from "@/db";
import { usersTable } from "@/db/schema/user";
import { workOrderProgressTable, workOrderTable } from "@/db/schema/work-order";
import IWorkOrderRepository from "@/lib/application/repositories/work-order.repository.interface";
import {
    WorkOrder,
    WorkOrderInputRecord,
    WorkOrderProgress,
    WorkOrderProgressInput,
    WorkOrderRecord,
    WorkOrderUpdateRecord,
} from "@/lib/entities/models/work-order.model";
import { endOfDay, parseISO, startOfDay } from "date-fns";
import { aliasedTable, and, asc, desc, eq, gte, lt } from "drizzle-orm";

export default class WorkOrderRepository implements IWorkOrderRepository {
    async create(
        workOrder: WorkOrderInputRecord,
        tx?: Transaction | undefined
    ): Promise<void> {
        const invoker = tx ?? db;
        await invoker.insert(workOrderTable).values({
            wo_num: workOrder.wo_num,
            status: workOrder.status,
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

    async getAll(assigned_to?: string): Promise<WorkOrderRecord[]> {
        const result = await db
            .select({
                id: workOrderTable.id,
                wo_num: workOrderTable.wo_num,
                product_name: workOrderTable.product_name,
                quantity: workOrderTable.quantity,
                result_quantity: workOrderTable.result_quantity,
                deadline: workOrderTable.deadline,
                status: workOrderTable.status,
                assigned_to: usersTable.name,
                created_by: workOrderTable.created_by,
            })
            .from(workOrderTable)
            .where(
                assigned_to
                    ? eq(workOrderTable.assigned_to, assigned_to)
                    : undefined
            )
            .orderBy(desc(workOrderTable.wo_num))
            .leftJoin(
                usersTable,
                eq(workOrderTable.assigned_to, usersTable.id)
            );

        return result as WorkOrderRecord[];
    }

    async findById(id: number): Promise<WorkOrder | null> {
        const createdUser = aliasedTable(usersTable, "created_by_table");
        const [result] = await db
            .select({
                id: workOrderTable.id,
                wo_num: workOrderTable.wo_num,
                product_name: workOrderTable.product_name,
                quantity: workOrderTable.quantity,
                result_quantity: workOrderTable.result_quantity,
                deadline: workOrderTable.deadline,
                status: workOrderTable.status,
                assigned_to: {
                    name: usersTable.name,
                    id: usersTable.id,
                    email: usersTable.email,
                },
                created_by: {
                    name: createdUser.name,
                    id: createdUser.id,
                    email: createdUser.email,
                },
            })
            .from(workOrderTable)
            .leftJoin(usersTable, eq(workOrderTable.assigned_to, usersTable.id))
            .leftJoin(
                createdUser,
                eq(workOrderTable.created_by, createdUser.id)
            )
            .where(eq(workOrderTable.id, id));

        if (result) {
            return result as WorkOrder;
        } else {
            return null;
        }
    }

    async update(
        idWorkOrder: number,
        workOrder: Partial<WorkOrderUpdateRecord>,
        tx?: Transaction | undefined
    ): Promise<void> {
        const invoker = tx ?? db;
        await invoker
            .update(workOrderTable)
            .set({
                product_name: workOrder.product_name,
                deadline: workOrder.deadline,
                quantity: workOrder.quantity,
                result_quantity: workOrder.result_quantity,
                wo_num: workOrder.wo_num,
                assigned_to: workOrder.assigned_to,
                status: workOrder.status,
            })
            .where(eq(workOrderTable.id, idWorkOrder));
    }

    async createProgress(
        progress: WorkOrderProgressInput,
        report_by: string,
        tx?: Transaction | undefined
    ): Promise<void> {
        const invoker = tx ?? db;
        await invoker.insert(workOrderProgressTable).values({
            work_order_id: progress.work_order_id,
            description: progress.description,
            date: progress.date,
            report_by: report_by,
        });
    }

    async getAllProgress(workOrderId: number): Promise<WorkOrderProgress[]> {
        const result = await db
            .select({
                id: workOrderProgressTable.id,
                date: workOrderProgressTable.date,
                report_by: {
                    name: usersTable.name,
                    id: usersTable.id,
                    email: usersTable.email,
                },
                work_order_id: workOrderProgressTable.work_order_id,
                description: workOrderProgressTable.description,
            })
            .from(workOrderProgressTable)
            .where(eq(workOrderProgressTable.work_order_id, workOrderId))
            .orderBy(asc(workOrderProgressTable.date))
            .leftJoin(
                usersTable,
                eq(workOrderProgressTable.report_by, usersTable.id)
            );

        return result as WorkOrderProgress[];
    }
}
