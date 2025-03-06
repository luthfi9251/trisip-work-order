import { EndWorkOrderUseCase } from "@/lib/application/use-cases/work-orders/end-work-order.use-case";
import { InputParsedError } from "@/lib/entities/errors/common";
import { UserRepository } from "@/lib/infrastructure/repositories/user.repository";
import WorkOrderRepository from "@/lib/infrastructure/repositories/work-order.repository";
import { z } from "zod";

const userRepository = new UserRepository();
const workOrderRepository = new WorkOrderRepository();

const endWorkOrderUseCase = new EndWorkOrderUseCase(
    userRepository,
    workOrderRepository
);

const inputSchema = z.object({
    id_work_order: z.coerce.number(),
    quantity: z.coerce.number(),
    user_id: z.string().nonempty(),
});

export const endWorkOrderController = async (
    id_work_order: number,
    quantity: number,
    user_id: string
) => {
    const parsedData = inputSchema.safeParse({
        id_work_order,
        quantity,
        user_id,
    });
    if (!parsedData.success) {
        const errorField = {
            ...parsedData.error?.flatten().fieldErrors,
        };
        console.log(errorField);
        throw new InputParsedError("Invalid Input", errorField);
    }

    return await endWorkOrderUseCase.execute(id_work_order, quantity, user_id);
};
