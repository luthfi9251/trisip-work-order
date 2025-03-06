import { GetViewWorkOrderUseCase } from "@/lib/application/use-cases/work-orders/get-view-work-order.use-case";
import { InputParsedError } from "@/lib/entities/errors/common";
import {
    WorkOrder,
    WorkOrderRecord,
} from "@/lib/entities/models/work-order.model";
import { UserRepository } from "@/lib/infrastructure/repositories/user.repository";
import WorkOrderRepository from "@/lib/infrastructure/repositories/work-order.repository";
import { z } from "zod";

const userRepository = new UserRepository();
const workOrderRepository = new WorkOrderRepository();

const getViewWorkOrderUseCase = new GetViewWorkOrderUseCase(
    userRepository,
    workOrderRepository
);

const inputSchema = z.object({
    id_work_order: z.coerce.number(),
    user_id: z.string().nonempty(),
});

const presenter = (workOrder: WorkOrder, id: number): WorkOrderRecord => ({
    id: id,
    product_name: workOrder.product_name,
    created_by: workOrder.created_by.name,
    assigned_to: workOrder.assigned_to.name,
    result_quantity: workOrder.result_quantity,
    deadline: workOrder.deadline,
    quantity: workOrder.quantity,
    status: workOrder.status,
    wo_num: workOrder.wo_num,
});

export const getViewWorkOrderController = async (
    id_work_order: string,
    user_id: string
) => {
    const parsedData = inputSchema.safeParse({ id_work_order, user_id });
    if (!parsedData.success) {
        const errorField = {
            ...parsedData.error?.flatten().fieldErrors,
        };
        throw new InputParsedError("Invalid Input", errorField);
    }

    const idWorkOrder = parseInt(id_work_order);
    const result = await getViewWorkOrderUseCase.execute(idWorkOrder, user_id);
    return presenter(result, idWorkOrder);
};
