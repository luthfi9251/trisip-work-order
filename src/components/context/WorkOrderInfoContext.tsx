"use client";

import { SessionDTO } from "@/lib/entities/models/session.model";
import { WorkOrderRecord } from "@/lib/entities/models/work-order.model";
import { ReactNode, createContext, useState } from "react";

type WorkOrderInfoState = [
    WorkOrderRecord | undefined,
    React.Dispatch<React.SetStateAction<WorkOrderRecord | undefined>>
];
export const WorkOrderInfoContext = createContext<
    WorkOrderInfoState | undefined
>(undefined);

export const WorkOrderInfoProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [workOrderInfo, setWorkOrderInfo] = useState<WorkOrderRecord>();

    return (
        <WorkOrderInfoContext.Provider
            value={[workOrderInfo, setWorkOrderInfo]}
        >
            {children}
        </WorkOrderInfoContext.Provider>
    );
};
