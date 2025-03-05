import { GetAllWorkOrderUseCase } from "@/lib/application/use-cases/work-orders/get-all-work-orders.use-case";
import { InputParsedError } from "@/lib/entities/errors/common";
import { SessionDTO } from "@/lib/entities/models/session.model";
import { UserRepository } from "@/lib/infrastructure/repositories/user.repository";
import WorkOrderRepository from "@/lib/infrastructure/repositories/work-order.repository";
import { z } from "zod";

const userRepository = new UserRepository();
const workOrderRepository = new WorkOrderRepository();

const getAllWorkOrdersUseCase = new GetAllWorkOrderUseCase(
    userRepository,
    workOrderRepository
);

const inputSchema = z.object({
    userId: z.string().nonempty(),
});

export const getAllWorkOrderController = async (userId: string) => {
    const parsedData = inputSchema.safeParse({ userId });
    if (!parsedData.success) {
        const errorField = {
            ...parsedData.error?.flatten().fieldErrors,
        };
        throw new InputParsedError("Invalid Input", errorField);
    }

    return await getAllWorkOrdersUseCase.execute(userId);
};
