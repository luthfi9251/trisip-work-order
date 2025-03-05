import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getOperatorsAction } from "../work-order.action";
import WorkFormWrapper from "./WorkFormWrapper";

export default async function Page() {
    const operatorsResponse = await getOperatorsAction();
    const operators = operatorsResponse.data ?? [];
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">
                        Create Work Order
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <WorkFormWrapper operators={operators} />
                </CardContent>
            </Card>
        </div>
    );
}
