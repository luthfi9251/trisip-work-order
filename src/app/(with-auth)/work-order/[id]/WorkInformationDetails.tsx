import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { WorkOrderType } from "../type";

const InformationField = ({
    label,
    value,
}: {
    label: string;
    value: string | number;
}) => (
    <div>
        <h4 className="font-semibold capitalize">{label.replace("_", " ")}</h4>
        <p>{value}</p>
    </div>
);

type WorkInformationDetailsProps = {
    workOrder: WorkOrderType;
};

export default function WorkInformationDetails({
    workOrder,
}: WorkInformationDetailsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl uppercase">
                    Work Order Information
                </CardTitle>
            </CardHeader>
            <CardContent className="grid lg:grid-cols-2 gap-3">
                {(Object.keys(workOrder) as (keyof WorkOrderType)[]).map(
                    (val, idx) => (
                        <InformationField
                            key={idx}
                            label={val}
                            value={workOrder[val]}
                        />
                    )
                )}
            </CardContent>
        </Card>
    );
}
