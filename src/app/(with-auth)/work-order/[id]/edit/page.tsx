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

const dummyData: WorkOrderType = {
    id: "1",
    no_wo: "WO-2223-303-22",
    product_name: "Sweet jar",
    quantity: 20,
    deadline: "2022-10-10",
    status: "pending",
    asigned_to: "John Doe",
};

export default function Page() {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">Edit Work Order</CardTitle>
                </CardHeader>
                <CardContent>
                    <WorkOrderForm editingValue={dummyData} isEditing />
                </CardContent>
            </Card>
        </div>
    );
}
