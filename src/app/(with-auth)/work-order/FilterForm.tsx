"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    Form,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Filter } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TableFilterType } from "./DataTable";
import { useEffect, useState } from "react";
import { User } from "@/lib/entities/models/user.model";
import { getOperatorsAction } from "./work-order.action";

const formSchema = z.object({
    deadline_start: z.coerce.date().optional().nullable(),
    deadline_end: z.coerce.date().optional().nullable(),
    assigned_id: z.string().optional(),
});
type FilterType = z.infer<typeof formSchema>;

export default function FilterForm({
    onFilterChange,
}: {
    onFilterChange: (filter: TableFilterType) => void;
}) {
    const [open, setOpen] = useState(false);
    const [operatorList, setOperatorList] = useState<User[]>([]);

    const form = useForm<FilterType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            deadline_start: undefined,
            deadline_end: undefined,
            assigned_id: undefined,
        },
    });

    const onSubmit = (values: FilterType) => {
        const data: TableFilterType = {
            start_date: values.deadline_start?.toISOString() ?? "",
            end_date: values.deadline_end?.toISOString() ?? "",
            assigned_to: values.assigned_id ?? "",
        };
        onFilterChange(data);
        setOpen(false);
    };

    const onReset = () => {
        form.reset({
            deadline_start: null as unknown as Date,
            deadline_end: null as unknown as Date, //bug in radix ui, reset should use empty string """
            assigned_id: "",
        });
        // form.setValue("deadline_start", undefined);
        const data: TableFilterType = {
            start_date: "",
            end_date: "",
            assigned_to: "",
        };
        onFilterChange(data);
    };

    useEffect(() => {
        getOperatorsAction()
            .then((res) => {
                if (res.status === "success") {
                    if (res.data) {
                        setOperatorList(res.data);
                    }
                } else {
                    throw res.error?.message;
                }
            })
            .catch((err) => {
                return;
            });
    }, []);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Filter />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Filter your data</DialogTitle>
                    <DialogDescription>
                        You can filter data by{" "}
                        <span className="font-semibold">Deadline</span> or
                        <span className="font-semibold"> Asignee</span>.
                    </DialogDescription>
                </DialogHeader>

                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className=" space-y-3"
                        >
                            <div className="border rounded-lg p-4 space-y-3">
                                <h3 className="font-semibold">Deadline</h3>
                                <FormField
                                    control={form.control}
                                    name="deadline_start"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Start</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal",
                                                                !field.value &&
                                                                    "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(
                                                                    field.value,
                                                                    "PPP"
                                                                )
                                                            ) : (
                                                                <span>
                                                                    Pick a date
                                                                </span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    className="w-auto p-0"
                                                    align="start"
                                                >
                                                    <Calendar
                                                        mode="single"
                                                        selected={
                                                            field.value as
                                                                | Date
                                                                | undefined
                                                        }
                                                        onSelect={
                                                            field.onChange
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="deadline_end"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>End</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal",
                                                                !field.value &&
                                                                    "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(
                                                                    field.value,
                                                                    "PPP"
                                                                )
                                                            ) : (
                                                                <span>
                                                                    Pick a date
                                                                </span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    className="w-auto p-0"
                                                    align="start"
                                                >
                                                    <Calendar
                                                        mode="single"
                                                        selected={
                                                            field.value as
                                                                | Date
                                                                | undefined
                                                        }
                                                        onSelect={
                                                            field.onChange
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="border rounded-lg p-4 space-y-3">
                                <h3 className="font-semibold">Operator</h3>
                                <FormField
                                    control={form.control}
                                    name="assigned_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Assigned To</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Chosee Asignee" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {operatorList.map(
                                                        (item, idx) => (
                                                            <SelectItem
                                                                key={item.id}
                                                                value={item.id}
                                                            >
                                                                {item.name}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="lg:col-span-2 flex justify-end gap-3">
                                <Button
                                    variant="destructive"
                                    type="reset"
                                    onClick={onReset}
                                    className="cursor-pointer"
                                >
                                    Reset
                                </Button>
                                <Button
                                    type="submit"
                                    className="cursor-pointer"
                                >
                                    Apply
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}
