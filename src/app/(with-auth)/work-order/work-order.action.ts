"use server";

import { getUserSession } from "@/app/auth.action";
import { UnauthorizedError } from "@/lib/entities/errors/common";
import { ServerResponse } from "@/lib/entities/models/response.model";
import { User } from "@/lib/entities/models/user.model";
import { WorkOrderCreateDTO } from "@/lib/entities/models/work-order.model";
import { createWorkOrderController } from "@/lib/interface-adapters/controllers/work-orders/create-work-order.controller";
import { getOperatorsController } from "@/lib/interface-adapters/controllers/work-orders/get-operators.controller";
import { redirect } from "next/navigation";

export const getOperatorsAction = async (): Promise<
    ServerResponse<User[] | null>
> => {
    try {
        let data = await getOperatorsController();
        return {
            data,
            error: null,
            status: "success",
        };
    } catch (err) {
        return {
            data: null,
            error: {
                message: "Can't retrieve data",
                type: "Error",
            },
            status: "error",
        };
    }
};

export const createWorkOrderAction = async (
    data: WorkOrderCreateDTO
): Promise<ServerResponse<string | null>> => {
    try {
        let session = await getUserSession();
        if (!session) {
            redirect("/");
        }
        const create = await createWorkOrderController(data, session);
        return {
            data: create,
            error: null,
            status: "success",
        };
    } catch (err: any) {
        if (err.message === "NEXT_REDIRECT") throw err;
        if (err instanceof UnauthorizedError) {
            return {
                status: "error",
                data: null,
                error: {
                    message: "You're unauthorize to create work order",
                    type: err.name,
                },
            };
        }

        console.log(err);
        return {
            status: "error",
            data: null,
            error: {
                message: "Error when creating work order!",
                type: "Error",
            },
        };
    }
};
