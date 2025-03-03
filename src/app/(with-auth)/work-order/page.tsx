import DataTable, { WorkOrderView } from "./DataTable";

const dummyData: WorkOrderView[] = [
    {
        id: "1",
        no_wo: "WO-20240226-001",
        product_name: "Product A",
        quantity: 10,
        deadline: "2024-02-26",
        status: "pending",
        asigned_to: "John Doe",
    },
    {
        id: "2",
        no_wo: "WO-20240226-002",
        product_name: "Product B",
        quantity: 5,
        deadline: "2024-02-26",
        status: "processing",
        asigned_to: "John Doe",
    },
    {
        id: "3",
        no_wo: "WO-20240226-003",
        product_name: "Product C",
        quantity: 15,
        deadline: "2024-02-26",
        status: "completed",
        asigned_to: "John Doe",
    },
    {
        id: "4",
        no_wo: "WO-20240226-004",
        product_name: "Product D",
        quantity: 20,
        deadline: "2024-02-26",
        status: "canceled",
        asigned_to: "John Doe",
    },
    {
        id: "5",
        no_wo: "WO-20240226-005",
        product_name: "Product E",
        quantity: 25,
        deadline: "2024-02-26",
        status: "pending",
        asigned_to: "John Doe",
    },
];

export default function Page() {
    return (
        <div className="w-full">
            <h1 className="text-3xl font-bold my-2 uppercase">
                Work Order Management
            </h1>

            <DataTable data={dummyData} />
        </div>
    );
}
