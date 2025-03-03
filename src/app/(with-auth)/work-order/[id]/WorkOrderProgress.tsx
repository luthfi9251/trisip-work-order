import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { WorkOrderProgressItemType } from "../type";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import * as dateFns from "date-fns";
import ProgressForm from "./ProgressForm";

const WorkOrderProgressItem = ({
    progressItem,
}: {
    progressItem: WorkOrderProgressItemType;
}) => {
    return (
        <TableRow>
            <TableCell>
                {dateFns.format(progressItem.date, "EEEE, dd MMMM yyyy HH:mm")}
            </TableCell>
            <TableCell>{progressItem.asigned_to}</TableCell>
            <TableCell>{progressItem.asigned_to}</TableCell>
        </TableRow>
    );
};

type WorkOrderProgressProps = {
    progress: WorkOrderProgressItemType[];
};

export default function WorkOrderProgres({ progress }: WorkOrderProgressProps) {
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
                <ProgressForm />
            </CardContent>
        </Card>
    );
}
