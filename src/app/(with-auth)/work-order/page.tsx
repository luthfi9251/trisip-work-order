import { WorkOrderRecord } from "@/lib/entities/models/work-order.model";
import DataTable from "./DataTable";
import { getAllWorkOrdersAction } from "./work-order.action";
import { getUserSession } from "@/app/auth.action";
import { AuthContext, AuthProvider } from "@/components/context/AuthContext";

export default async function Page() {
    const session = await getUserSession();
    const workOrderData = await getAllWorkOrdersAction();

    return (
        <AuthProvider session={session}>
            <div className="w-full">
                <h1 className="text-3xl font-bold my-2 uppercase">
                    Work Order Management
                </h1>

                <DataTable data={workOrderData.data} />
            </div>
        </AuthProvider>
    );
}
