"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { WorkOrderRecord } from "@/lib/entities/models/work-order.model";
import { format } from "date-fns";
import { WorkOrderInfoContext } from "@/components/context/WorkOrderInfoContext";
import { useContext, useEffect } from "react";

const InformationField = ({
    label,
    value,
}: {
    label: string;
    value: string | number | Date;
}) => (
    <div>
        <h4 className="font-semibold text-sm capitalize">
            {label.replace("_", " ").toLocaleUpperCase()}
        </h4>
        <p>
            {value instanceof Date ? format(value, "EEEE, d MMMM yyyy") : value}
        </p>
    </div>
);

type WorkInformationDetailsProps = {
    workOrder: WorkOrderRecord;
};

export default function WorkInformationDetails({
    workOrder,
}: WorkInformationDetailsProps) {
    const workOrderContext = useContext(WorkOrderInfoContext);

    useEffect(() => {
        if (workOrderContext) {
            const setInfo = workOrderContext[1];
            setInfo(workOrder);
        }
    }, [workOrderContext]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl uppercase">
                    Work Order Information
                </CardTitle>
            </CardHeader>
            <CardContent className="grid lg:grid-cols-2 gap-3">
                {(Object.keys(workOrder) as (keyof WorkOrderRecord)[])
                    .filter((item) => item !== "id")
                    .map((val, idx) => (
                        <InformationField
                            key={idx}
                            label={val}
                            value={workOrder[val]}
                        />
                    ))}
            </CardContent>
        </Card>
    );
}
