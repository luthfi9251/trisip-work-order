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

const formSchema = z.object({
    deadline_start: z.coerce.date(),
    deadline_end: z.coerce.date(),
    assigned_id: z.string(),
});
type FilterType = z.infer<typeof formSchema>;

export default function FilterForm() {
    const form = useForm<FilterType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            deadline_start: undefined,
            deadline_end: undefined,
            assigned_id: undefined,
        },
    });

    function onSubmit(values: FilterType) {}

    return (
        <Dialog>
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
                        <span className="font-semibold">Asignee</span>.
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
                                                        selected={field.value}
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
                                                        selected={field.value}
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
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="m@example.com">
                                                        m@example.com
                                                    </SelectItem>
                                                    <SelectItem value="m@google.com">
                                                        m@google.com
                                                    </SelectItem>
                                                    <SelectItem value="m@support.com">
                                                        m@support.com
                                                    </SelectItem>
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
                                    className="cursor-pointer"
                                >
                                    Reset
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="cursor-pointer"
                                >
                                    Cancel
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
