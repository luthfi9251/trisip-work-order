import { User } from "./user.model";

export enum WorkOrderStatus {
    PENDING,
    IN_PROGRESS,
    COMPLETED,
    CANCELED,
}

export type WorkOrderUserAssigned = Omit<User, "password">;

export type WorkOrder = {
    wo_number: string;
    product_name: string;
    quantity: number;
    deadline: Date;
    status: WorkOrderStatus;
    assigned_to: WorkOrderUserAssigned;
    created_by: WorkOrderUserAssigned;
};
