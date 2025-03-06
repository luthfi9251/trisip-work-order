import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getOperatorsAction } from "../work-order.action";
import WorkFormWrapper from "./WorkFormWrapper";
import { getUserSession } from "@/app/auth.action";
import { UserRole } from "@/lib/entities/models/user.model";

export default async function Page() {
    const session = await getUserSession();

    if (session?.user?.role !== UserRole.PRODUCTION_MANAGER) {
        throw new Error("You're not alowed to create work order");
    }

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
