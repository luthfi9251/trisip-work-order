import { getAllProgressAction } from "../../work-order.action";
import WorkOrderProgres from "../WorkOrderProgress";

export default async function WorkProgressWrapper({ id }: { id: string }) {
    const progressResponse = await getAllProgressAction(id);

    return (
        <WorkOrderProgres progress={progressResponse.data}></WorkOrderProgres>
    );
}
