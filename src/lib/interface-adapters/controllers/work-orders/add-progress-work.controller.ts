import { AddProgressWorkUseCase } from "@/lib/application/use-cases/work-orders/add-progress-work.use-case";
import { InputParsedError } from "@/lib/entities/errors/common";
import { WorkOrderProgressInput } from "@/lib/entities/models/work-order.model";
import { UserRepository } from "@/lib/infrastructure/repositories/user.repository";
import WorkOrderRepository from "@/lib/infrastructure/repositories/work-order.repository";
import { z } from "zod";

const userRepository = new UserRepository();
const workOrderRepository = new WorkOrderRepository();

const addProgressWorkUseCase = new AddProgressWorkUseCase(
    userRepository,
    workOrderRepository
);

const inputSchema = z.object({
    date: z.coerce.date(),
    work_order_id: z.number(),
    description: z.string().nonempty(),
});

export const addProgressWorkController = async (
    progressData: WorkOrderProgressInput,
    user_id: string
) => {
    const parsedData = inputSchema.safeParse(progressData);
    if (!parsedData.success) {
        const errorField = {
            ...parsedData.error?.flatten().fieldErrors,
        };
        throw new InputParsedError("Invalid Input", errorField);
    }
    return await addProgressWorkUseCase.execute(parsedData.data, user_id);
};
