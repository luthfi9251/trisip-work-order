import { GetSummaryOperatorUseCase } from "@/lib/application/use-cases/work-orders/get-summary-operator.use-case";
import { InputParsedError } from "@/lib/entities/errors/common";
import { UserRepository } from "@/lib/infrastructure/repositories/user.repository";
import WorkOrderRepository from "@/lib/infrastructure/repositories/work-order.repository";
import { z } from "zod";

const userRepository = new UserRepository();
const workOrderRepository = new WorkOrderRepository();

const getSummaryOperatorUseCase = new GetSummaryOperatorUseCase(
    userRepository,
    workOrderRepository
);

const inputSchema = z.object({
    user_id: z.string().nonempty(),
});

export const getSummaryOperatorController = async (user_id: string) => {
    const parsedData = inputSchema.safeParse({ user_id });
    if (!parsedData.success) {
        const errorField = {
            ...parsedData.error?.flatten().fieldErrors,
        };
        throw new InputParsedError("Invalid Input", errorField);
    }
    const result = await getSummaryOperatorUseCase.execute(user_id);
    return result;
};
