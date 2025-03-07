"use client";
import { User } from "@/lib/entities/models/user.model";
import { toast } from "sonner";
import {
    WorkOrder,
    WorkOrderCreateDTO,
    WorkOrderInputRecord,
    WorkOrderRecord,
    WorkOrderStatusType,
} from "@/lib/entities/models/work-order.model";
import WorkOrderForm, { WorkFormValueType } from "../../WorkOrderForm";
import { useParams, useRouter } from "next/navigation";
import { updateWorkOrderAction } from "../../work-order.action";

export default function EditWorkFormWrapper({
    editingValue,
    operators,
}: {
    editingValue: WorkOrder;
    operators: User[];
}) {
    let params = useParams<{ id: string }>();
    let router = useRouter();
    const handleSubmit = async (value: WorkFormValueType) => {
        const toastId = toast.loading("Loading…");
        const data: WorkOrderInputRecord = {
            product_name: value.product_name,
            assigned_to: value.assigned_to,
            deadline: value.deadline,
            quantity: value.quantity,
            status: value.status as WorkOrderStatusType,
            result_quantity: 0,
            created_by: "",
            wo_num: "",
        };
        const response = await updateWorkOrderAction(params.id, data);
        if (response.status == "success") {
            toast.success(`Work order successfully updated`, {
                id: toastId,
            });
            router.push("/work-order");
        } else {
            toast.error(response.error?.message, {
                id: toastId,
            });
        }
    };

    return (
        <WorkOrderForm
            isEditing={true}
            editingValue={editingValue}
            operators={operators}
            onSubmit={handleSubmit}
        />
    );
}
