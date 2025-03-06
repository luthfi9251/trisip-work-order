import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import * as dateFns from "date-fns";
import { ReactNode } from "react";
import { WorkOrderProgressDTO } from "@/lib/entities/models/work-order.model";

const WorkOrderProgressItem = ({
    progressItem,
}: {
    progressItem: WorkOrderProgressDTO;
}) => {
    return (
        <TableRow>
            <TableCell>
                {dateFns.format(progressItem.date, "EEEE, dd MMMM yyyy HH:mm")}
            </TableCell>
            <TableCell>{progressItem.report_by}</TableCell>
            <TableCell>{progressItem.description}</TableCell>
        </TableRow>
    );
};

type WorkOrderProgressProps = {
    progress: WorkOrderProgressDTO[];
    children?: ReactNode;
};

export default async function WorkOrderProgres({
    progress,
    children,
}: WorkOrderProgressProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl uppercase">
                    Work Order Progress
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[150px]">Date</TableHead>
                            <TableHead className="w-[200px]">
                                Report By
                            </TableHead>
                            <TableHead>Description</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {progress.map((val, idx) => (
                            <WorkOrderProgressItem
                                key={idx}
                                progressItem={val}
                            />
                        ))}
                    </TableBody>
                </Table>
                {children}
            </CardContent>
        </Card>
    );
}
