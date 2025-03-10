import { User } from "./user.model";

export const WorkOrderStatus = {
    PENDING: "PENDING",
    IN_PROGRESS: "IN_PROGRESS",
    COMPLETED: "COMPLETED",
    CANCELED: "CANCELED",
};

export type WorkOrderStatusType = keyof typeof WorkOrderStatus;

export type WorkOrderUserAssigned = Omit<User, "password" | "role" | "email">;

export type WorkOrder = {
    id: number;
    wo_num: string;
    product_name: string;
    quantity: number;
    result_quantity: number;
    deadline: Date;
    status: WorkOrderStatusType;
    assigned_to: WorkOrderUserAssigned;
    created_by: WorkOrderUserAssigned;
};

export type WorkOrderCreateDTO = Omit<
    WorkOrder,
    "wo_num" | "assigned_to" | "created_by" | "id"
> & { assigned_to_id: string };

export type WorkOrderInputRecord = Omit<
    WorkOrder,
    "assigned_to" | "created_by" | "id"
> & {
    assigned_to: string;
    created_by: string;
};

export type WorkOrderUpdateRecord = WorkOrderInputRecord & { id: number };

export type WorkOrderRecord = Omit<WorkOrder, "assigned_to" | "created_by"> & {
    assigned_to: string;
    created_by: string;
};

export type WorkOrderProgress = {
    id: number;
    date: Date;
    report_by: WorkOrderUserAssigned;
    work_order_id: number;
    description: string;
};

export type WorkOrderProgressInput = Omit<
    WorkOrderProgress,
    "id" | "report_by"
>;

export type WorkOrderProgressDTO = Omit<WorkOrderProgress, "report_by"> & {
    report_by: string;
};

export type WorkOrderSummaryProduct = {
    product_name: string;
    pending_quantity: number;
    in_progress_quantity: number;
    completed_quantity: number;
    canceled_quantity: number;
};

export type WorkOrderSummaryOperator = {
    operator_name: string;
    product_name: string;
    completed_quantity: number;
};
