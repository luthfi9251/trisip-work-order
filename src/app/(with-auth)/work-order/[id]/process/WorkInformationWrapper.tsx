import { getViewWorkOrderAction } from "../../work-order.action";
import WorkInformationDetails from "../WorkInformationDetails";

export default async function WorkInformationWrapper({ id }: { id: string }) {
    const workInformationResponse = await getViewWorkOrderAction(id);
    if (
        workInformationResponse.status === "error" ||
        !workInformationResponse.data
    ) {
        throw workInformationResponse.error;
    }
    return <WorkInformationDetails workOrder={workInformationResponse.data} />;
}
