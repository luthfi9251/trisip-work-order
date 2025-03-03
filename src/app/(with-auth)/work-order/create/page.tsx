import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import WorkOrderForm from "./WorkOrderForm";

export default function Page() {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">
                        Create Work Order
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <WorkOrderForm isEditing={false} />
                </CardContent>
            </Card>
        </div>
    );
}
