import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
