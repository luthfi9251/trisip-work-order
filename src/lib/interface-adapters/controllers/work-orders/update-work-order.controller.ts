import { UpdateWorkOrderUseCase } from "@/lib/application/use-cases/work-orders/update-work-order.use-case";
import { InputParsedError } from "@/lib/entities/errors/common";
import { SessionDTO } from "@/lib/entities/models/session.model";
import {
    WorkOrderCreateDTO,
    WorkOrderStatus,
    WorkOrderUpdateRecord,
} from "@/lib/entities/models/work-order.model";
import { UserRepository } from "@/lib/infrastructure/repositories/user.repository";
import WorkOrderRepository from "@/lib/infrastructure/repositories/work-order.repository";
import { z } from "zod";

const workOrderRepository = new WorkOrderRepository();
const userRepository = new UserRepository();

const updateWorkOrderUseCase = new UpdateWorkOrderUseCase(
    userRepository,
    workOrderRepository
);

const workOrderSchema = z.object({
    id: z.coerce.number(),
    product_name: z.string().nonempty(),
    quantity: z.number(),
    deadline: z.coerce.date(),
    status: z.nativeEnum(WorkOrderStatus),
    assigned_to: z.string().nonempty("Cannot be empty"),
});

export const updateWorkOrderController = async (
    workOrderData: WorkOrderUpdateRecord,
    userId: string
) => {
    const parsedData = workOrderSchema.safeParse(workOrderData);
    if (!parsedData.success) {
        const errorField = {
            ...parsedData.error?.flatten().fieldErrors,
        };
        throw new InputParsedError("Invalid Input", errorField);
    }

    return await updateWorkOrderUseCase.execute(workOrderData, userId);
};
