import { GetEditWorkOrderUseCase } from "@/lib/application/use-cases/work-orders/get-edit-work-order.use-case";
import { InputParsedError } from "@/lib/entities/errors/common";
import { UserRepository } from "@/lib/infrastructure/repositories/user.repository";
import WorkOrderRepository from "@/lib/infrastructure/repositories/work-order.repository";
import { z } from "zod";

const userRepository = new UserRepository();
const workOrderRepository = new WorkOrderRepository();

const getEditWorkOrderUseCase = new GetEditWorkOrderUseCase(
    userRepository,
    workOrderRepository
);

const inputSchema = z.object({
    id_work_order: z.coerce.number(),
    user_id: z.string().nonempty(),
});

export const getEditWorkOrderController = async (
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

    return await getEditWorkOrderUseCase.execute(
        parseInt(id_work_order),
        user_id
    );
};
