import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import WorkOrderForm from "../../WorkOrderForm";
import { WorkOrderType } from "../../type";
import { WorkOrderRecord } from "@/lib/entities/models/work-order.model";
import EditWorkFormWrapper from "./EditFormWrapper";
import {
    getEditWorkOrderAction,
    getOperatorsAction,
} from "../../work-order.action";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const workOrderId = (await params).id;
    const workOrderData = getEditWorkOrderAction(workOrderId);
    const operatorsResponse = getOperatorsAction();

    const [workOrderDataRes, operatorResponse] = await Promise.all([
        workOrderData,
        operatorsResponse,
    ]);
    const operators = operatorResponse.data ?? [];
    if (!workOrderDataRes.data) {
        throw new Error(workOrderDataRes.error?.message);
    }
    const editData = workOrderDataRes.data;

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">Edit Work Order</CardTitle>
                </CardHeader>
                <CardContent>
                    <EditWorkFormWrapper
                        editingValue={editData}
                        operators={operators}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
