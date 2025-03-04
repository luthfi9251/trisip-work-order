"use client";
import { User } from "@/lib/entities/models/user.model";
import WorkOrderForm, { WorkFormValueType } from "../WorkOrderForm";
import { toast } from "sonner";
import { createWorkOrderAction } from "../work-order.action";
import { WorkOrderCreateDTO } from "@/lib/entities/models/work-order.model";

export default function WorkFormWrapper({ operators }: { operators: User[] }) {
    const handleSubmit = async (value: WorkFormValueType) => {
        const toastId = toast.loading("Loading…");
        const data: WorkOrderCreateDTO = {
            product_name: value.product_name,
            assigned_to_id: value.assigned_to,
            deadline: value.deadline,
            quantity: value.quantity,
            status: value.status,
        };
        const response = await createWorkOrderAction(data);
        if (response.status == "success") {
            toast.success(`Work order ${response.data} successfully created`, {
                id: toastId,
            });
        } else {
            toast.error(response.error?.message, {
                id: toastId,
            });
        }
    };

    return (
        <WorkOrderForm
            isEditing={false}
            operators={operators}
            onSubmit={handleSubmit}
        />
    );
}
