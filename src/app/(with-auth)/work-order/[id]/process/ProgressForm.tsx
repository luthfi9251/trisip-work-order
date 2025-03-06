"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { useContext, useMemo } from "react";
import { WorkOrderInfoContext } from "@/components/context/WorkOrderInfoContext";
import { WorkOrderProgressInput } from "@/lib/entities/models/work-order.model";
import { toast } from "sonner";
import { addProgressWorkAction } from "../../work-order.action";

const formSchema = z.object({
    description: z.string(),
});

export default function ProgressForm() {
    const workOrderContext = useContext(WorkOrderInfoContext);
    const workOrderStatus = useMemo(() => {
        if (workOrderContext) {
            const [state, _] = workOrderContext;
            return state?.status ?? "";
        }
        return "";
    }, [workOrderContext]);

    const workOrderID = useMemo(() => {
        if (workOrderContext) {
            const [state, _] = workOrderContext;
            return state?.id ?? null;
        }
        return null;
    }, [workOrderContext]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (workOrderID) {
            const toastId = toast.loading("Loading…");
            const dataProgress: WorkOrderProgressInput = {
                description: values.description,
                date: new Date(),
                work_order_id: workOrderID,
            };
            const response = await addProgressWorkAction(dataProgress);

            if (response.status == "success") {
                form.resetField("description");
                toast.success(`Progress successfully saved`, {
                    id: toastId,
                });
            } else {
                toast.error(response.error?.message, {
                    id: toastId,
                });
            }
        } else {
            toast.error("Can't add progress!");
        }
    };

    if (workOrderStatus === "IN_PROGRESS") {
        return (
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mt-5 space-y-3"
                >
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Work Progress Report</FormLabel>
                                <FormControl>
                                    <Textarea
                                        required
                                        placeholder="Write progress report here.."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Save</Button>
                </form>
            </Form>
        );
    }
}
