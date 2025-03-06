"use server";

import { getUserSession } from "@/app/auth.action";
import {
    OperationalError,
    UnauthorizedError,
} from "@/lib/entities/errors/common";
import { ServerResponse } from "@/lib/entities/models/response.model";
import { User } from "@/lib/entities/models/user.model";
import {
    WorkOrder,
    WorkOrderCreateDTO,
    WorkOrderInputRecord,
    WorkOrderProgressDTO,
    WorkOrderProgressInput,
    WorkOrderRecord,
} from "@/lib/entities/models/work-order.model";
import { addProgressWorkController } from "@/lib/interface-adapters/controllers/work-orders/add-progress-work.controller";
import { createWorkOrderController } from "@/lib/interface-adapters/controllers/work-orders/create-work-order.controller";
import { endWorkOrderController } from "@/lib/interface-adapters/controllers/work-orders/end-work-order.controller";
import { getAllProgressController } from "@/lib/interface-adapters/controllers/work-orders/get-all-progress.controller";
import { getAllWorkOrderController } from "@/lib/interface-adapters/controllers/work-orders/get-all-work-orders.controller";
import { getEditWorkOrderController } from "@/lib/interface-adapters/controllers/work-orders/get-edit-work-order.controller";
import { getOperatorsController } from "@/lib/interface-adapters/controllers/work-orders/get-operators.controller";
import { getViewWorkOrderController } from "@/lib/interface-adapters/controllers/work-orders/get-view-work-order.controller";
import { startWorkOrderController } from "@/lib/interface-adapters/controllers/work-orders/start-work-order.controller";
import { updateWorkOrderController } from "@/lib/interface-adapters/controllers/work-orders/update-work-order.controller";
import { revalidatePath } from "next/cache";
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

export const getAllWorkOrdersAction = async (): Promise<
    ServerResponse<WorkOrder[]>
> => {
    try {
        let session = await getUserSession();
        if (!session || !session.user) {
            redirect("/");
        }
        const workOrders = await getAllWorkOrderController(session.user.id);
        return {
            data: workOrders,
            error: null,
            status: "success",
        };
    } catch (err: any) {
        if (err.message === "NEXT_REDIRECT") throw err;
        if (err instanceof OperationalError) {
            return {
                status: "error",
                data: [],
                error: {
                    message: err.message,
                    type: err.name,
                },
            };
        }

        console.log(err);
        return {
            status: "error",
            data: [],
            error: {
                message: "Error when getting all work order!",
                type: "Error",
            },
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

export const getEditWorkOrderAction = async (
    idWorkOrder: string
): Promise<ServerResponse<WorkOrder | null>> => {
    try {
        let session = await getUserSession();
        if (!session || !session.user) {
            redirect("/");
        }
        const data = await getEditWorkOrderController(
            idWorkOrder,
            session.user.id
        );

        return {
            data: data,
            error: null,
            status: "success",
        };
    } catch (err: any) {
        if (err.message === "NEXT_REDIRECT") throw err;
        if (err instanceof OperationalError) {
            return {
                status: "error",
                data: null,
                error: {
                    message: err.message,
                    type: err.name,
                },
            };
        }
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
                message: "Error when getting work order!",
                type: "Error",
            },
        };
    }
};

export const updateWorkOrderAction = async (
    idWorkOrder: string,
    workOrderData: WorkOrderInputRecord
): Promise<ServerResponse<null>> => {
    try {
        let session = await getUserSession();
        if (!session || !session.user) {
            redirect("/");
        }
        await updateWorkOrderController(
            {
                id: parseInt(idWorkOrder),
                wo_num: "",
                assigned_to: workOrderData.assigned_to,
                status: workOrderData.status,
                product_name: workOrderData.product_name,
                result_quantity: workOrderData.result_quantity,
                deadline: workOrderData.deadline,
                created_by: "",
                quantity: workOrderData.quantity,
            },
            session.user.id
        );
        revalidatePath("/work-order");
        return {
            data: null,
            error: null,
            status: "success",
        };
    } catch (err: any) {
        if (err.message === "NEXT_REDIRECT") throw err;
        if (err instanceof OperationalError) {
            return {
                status: "error",
                data: null,
                error: {
                    message: err.message,
                    type: err.name,
                },
            };
        }
        if (err instanceof UnauthorizedError) {
            return {
                status: "error",
                data: null,
                error: {
                    message: "You're unauthorize to edit work order",
                    type: err.name,
                },
            };
        }
        console.log(err);
        return {
            status: "error",
            data: null,
            error: {
                message: "Error when updating work order!",
                type: "Error",
            },
        };
    }
};

export const getViewWorkOrderAction = async (
    idWorkOrder: string
): Promise<ServerResponse<WorkOrderRecord | null>> => {
    try {
        let session = await getUserSession();
        if (!session || !session.user) {
            redirect("/");
        }
        const data = await getViewWorkOrderController(
            idWorkOrder,
            session.user.id
        );

        return {
            data: data,
            error: null,
            status: "success",
        };
    } catch (err: any) {
        if (err.message === "NEXT_REDIRECT") throw err;
        if (err instanceof OperationalError) {
            return {
                status: "error",
                data: null,
                error: {
                    message: err.message,
                    type: err.name,
                },
            };
        }
        if (err instanceof UnauthorizedError) {
            return {
                status: "error",
                data: null,
                error: {
                    message: "You're unauthorize to view work order",
                    type: err.name,
                },
            };
        }
        console.log(err);
        return {
            status: "error",
            data: null,
            error: {
                message: "Error when getting work order!",
                type: "Error",
            },
        };
    }
};

export const startWorkOrderAction = async (
    idWorkOrder: string
): Promise<ServerResponse<null>> => {
    try {
        let session = await getUserSession();
        if (!session || !session.user) {
            redirect("/");
        }
        await startWorkOrderController(idWorkOrder, session.user.id);
        revalidatePath(`/work-order/${idWorkOrder}/process`);
        return {
            data: null,
            error: null,
            status: "success",
        };
    } catch (err: any) {
        if (err.message === "NEXT_REDIRECT") throw err;
        if (err instanceof OperationalError) {
            return {
                status: "error",
                data: null,
                error: {
                    message: err.message,
                    type: err.name,
                },
            };
        }
        if (err instanceof UnauthorizedError) {
            return {
                status: "error",
                data: null,
                error: {
                    message: err.message,
                    type: err.name,
                },
            };
        }
        console.log(err);
        return {
            status: "error",
            data: null,
            error: {
                message: "Error when starting work order!",
                type: "Error",
            },
        };
    }
};

export const endWorkOrderAction = async (
    idWorkOrder: number,
    result_quantity: number
): Promise<ServerResponse<null>> => {
    try {
        let session = await getUserSession();
        if (!session || !session.user) {
            redirect("/");
        }
        await endWorkOrderController(
            idWorkOrder,
            result_quantity,
            session.user.id
        );
        revalidatePath(`/work-order/${idWorkOrder}/process`);
        return {
            data: null,
            error: null,
            status: "success",
        };
    } catch (err: any) {
        if (err.message === "NEXT_REDIRECT") throw err;
        if (err instanceof OperationalError) {
            return {
                status: "error",
                data: null,
                error: {
                    message: err.message,
                    type: err.name,
                },
            };
        }
        if (err instanceof UnauthorizedError) {
            return {
                status: "error",
                data: null,
                error: {
                    message: err.message,
                    type: err.name,
                },
            };
        }
        console.log(err);
        return {
            status: "error",
            data: null,
            error: {
                message: "Error when completing work order!",
                type: "Error",
            },
        };
    }
};

export const addProgressWorkAction = async (
    progressData: WorkOrderProgressInput
): Promise<ServerResponse<null>> => {
    try {
        let session = await getUserSession();
        if (!session || !session.user) {
            redirect("/");
        }
        await addProgressWorkController(progressData, session.user.id);
        revalidatePath(`/work-order/${progressData.work_order_id}/process`);
        return {
            data: null,
            error: null,
            status: "success",
        };
    } catch (err: any) {
        if (err.message === "NEXT_REDIRECT") throw err;
        if (err instanceof OperationalError) {
            return {
                status: "error",
                data: null,
                error: {
                    message: err.message,
                    type: err.name,
                },
            };
        }
        if (err instanceof UnauthorizedError) {
            return {
                status: "error",
                data: null,
                error: {
                    message: err.message,
                    type: err.name,
                },
            };
        }
        console.log(err);
        return {
            status: "error",
            data: null,
            error: {
                message: "Error when add progress work order!",
                type: "Error",
            },
        };
    }
};

export const getAllProgressAction = async (
    idWorkOrder: string
): Promise<ServerResponse<WorkOrderProgressDTO[]>> => {
    try {
        let session = await getUserSession();
        if (!session || !session.user) {
            redirect("/");
        }
        const data = await getAllProgressController(
            idWorkOrder,
            session.user.id
        );

        return {
            data: data,
            error: null,
            status: "success",
        };
    } catch (err: any) {
        if (err.message === "NEXT_REDIRECT") throw err;
        if (err instanceof OperationalError) {
            return {
                status: "error",
                data: [],
                error: {
                    message: err.message,
                    type: err.name,
                },
            };
        }
        if (err instanceof UnauthorizedError) {
            return {
                status: "error",
                data: [],
                error: {
                    message: err.message,
                    type: err.name,
                },
            };
        }
        console.log(err);
        return {
            status: "error",
            data: [],
            error: {
                message: "Error when getting progress!",
                type: "Error",
            },
        };
    }
};
