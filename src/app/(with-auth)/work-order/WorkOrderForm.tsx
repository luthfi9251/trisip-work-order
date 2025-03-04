"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { WorkOrderType } from "./type";
import { Label } from "@/components/ui/label";
import { User } from "@/lib/entities/models/user.model";
import {
    WorkOrderStatus,
    WorkOrderStatusType,
} from "@/lib/entities/models/work-order.model";

const formSchema = z.object({
    product_name: z.string().nonempty("Cannot be empty"),
    quantity: z.coerce.number().min(1, "Minimum quantity is 1"),
    deadline: z.coerce.date(),
    status: z.string().nonempty("Cannot be empty"),
    assigned_to: z.string().nonempty("Cannot be empty"),
});

export type WorkFormValueType = z.infer<typeof formSchema>;
export type WorkOrderFormProps = {
    isEditing: boolean;
    operators: User[];
    onSubmit: (values: WorkFormValueType) => void;
    editingValue?: WorkOrderType;
};

export default function WorkOrderForm(props: WorkOrderFormProps) {
    const form = useForm<WorkFormValueType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            product_name: props.editingValue
                ? props.editingValue.product_name
                : "",
            quantity: props.editingValue ? props.editingValue.quantity : 0,
            assigned_to: props.editingValue
                ? props.editingValue.asigned_to
                : "",
            status: props.editingValue ? props.editingValue.status : "",
            deadline: new Date(),
        },
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(props.onSubmit)}
                className="py-10 grid lg:grid-cols-2 gap-8"
            >
                {props.isEditing && props.editingValue && (
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Work Order No.</Label>
                        <Input
                            type="text"
                            disabled
                            defaultValue={props.editingValue.no_wo}
                        />
                    </div>
                )}{" "}
                <FormField
                    control={form.control}
                    name="product_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                                <Input placeholder="" type="text" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date of birth</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "font-normal",
                                                !field.value &&
                                                    "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
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
                                        onSelect={field.onChange}
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
                    name="assigned_to"
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
                                    {props.operators.map((item, idx) => (
                                        <SelectItem
                                            value={item.id}
                                            key={item.id}
                                        >
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
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
                                    {Object.values(WorkOrderStatus).map(
                                        (status) => (
                                            <SelectItem
                                                key={status}
                                                value={status}
                                            >
                                                {status.replace("_", " ")}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="lg:col-span-2 flex justify-end gap-3">
                    <Button variant="secondary" className="cursor-pointer">
                        Cancel
                    </Button>
                    <Button type="submit" className="cursor-pointer">
                        Save
                    </Button>
                </div>
            </form>
        </Form>
    );
}
