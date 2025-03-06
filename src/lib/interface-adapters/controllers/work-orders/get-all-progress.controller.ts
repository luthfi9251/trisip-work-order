import { GetAllProgressUseCase } from "@/lib/application/use-cases/work-orders/get-all-progress.use-case";
import { InputParsedError } from "@/lib/entities/errors/common";
import {
    WorkOrderProgress,
    WorkOrderProgressDTO,
} from "@/lib/entities/models/work-order.model";
import { UserRepository } from "@/lib/infrastructure/repositories/user.repository";
import WorkOrderRepository from "@/lib/infrastructure/repositories/work-order.repository";
import { z } from "zod";

const userRepository = new UserRepository();
const workOrderRepository = new WorkOrderRepository();

const getAllProgressUseCase = new GetAllProgressUseCase(
    userRepository,
    workOrderRepository
);

const inputSchema = z.object({
    work_order_id: z.coerce.number(),
    user_id: z.string().nonempty(),
});

const presenter = (progressData: WorkOrderProgress): WorkOrderProgressDTO => ({
    id: progressData.id,
    date: progressData.date,
    description: progressData.description,
    work_order_id: progressData.work_order_id,
    report_by: progressData.report_by.name,
});

export const getAllProgressController = async (
    work_order_id: string,
    user_id: string
) => {
    const parsedData = inputSchema.safeParse({ work_order_id, user_id });
    if (!parsedData.success) {
        const errorField = {
            ...parsedData.error?.flatten().fieldErrors,
        };
        throw new InputParsedError("Invalid Input", errorField);
    }
    const result = await getAllProgressUseCase.execute(
        parseInt(work_order_id),
        user_id
    );

    return result.map((item) => presenter(item));
};
