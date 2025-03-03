import { WorkOrderType } from "../../type";
import WorkInformationDetails from "../WorkInformationDetails";
import WorkOrderProgres from "../WorkOrderProgress";

const dummyData: WorkOrderType = {
    id: "1",
    no_wo: "WO-2223-303-22",
    product_name: "Sweet jar",
    quantity: 20,
    deadline: "2022-10-10",
    status: "pending",
    asigned_to: "John Doe",
};

const dummyProgress = [
    {
        id: "1",
        date: "2022-10-10",
        asigned_to: "John Doe",
        description: "Create a new design",
    },
    {
        id: "2",
        date: "2022-10-11",
        asigned_to: "John Doe",
        description: "Create a new design",
    },
    {
        id: "3",
        date: "2022-10-12",
        asigned_to: "John Doe",
        description: "Create a new design",
    },
];

export default function Page() {
    return (
        <div className="space-y-3">
            <WorkInformationDetails workOrder={dummyData} />
            <WorkOrderProgres progress={dummyProgress} />
        </div>
    );
}
