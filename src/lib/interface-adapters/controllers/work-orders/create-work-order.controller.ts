import { CreateWorkOrderUseCase } from "@/lib/application/use-cases/work-orders/create-work-order.use-case";
import { InputParsedError } from "@/lib/entities/errors/common";
import { SessionDTO } from "@/lib/entities/models/session.model";
import {
    WorkOrderCreateDTO,
    WorkOrderStatus,
} from "@/lib/entities/models/work-order.model";
import WorkOrderRepository from "@/lib/infrastructure/repositories/work-order.repository";
import { z } from "zod";

const workOrderRepository = new WorkOrderRepository();
const createWorkOrderUseCase = new CreateWorkOrderUseCase(workOrderRepository);

const workOrderSchema = z.object({
    product_name: z.string().nonempty(),
    quantity: z.number(),
    deadline: z.coerce.date(),
    status: z.nativeEnum(WorkOrderStatus),
    assigned_to_id: z.string().nonempty("Cannot be empty"),
});

export const createWorkOrderController = async (
    workOrderData: WorkOrderCreateDTO,
    session: SessionDTO
) => {
    const parsedData = workOrderSchema.safeParse(workOrderData);
    if (!parsedData.success) {
        const errorField = {
            ...parsedData.error?.flatten().fieldErrors,
        };
        throw new InputParsedError("Invalid Input", errorField);
    }

    return await createWorkOrderUseCase.execute(workOrderData, session);
};
