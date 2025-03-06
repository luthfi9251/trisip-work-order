"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { useContext, useMemo } from "react";
import { WorkOrderInfoContext } from "@/components/context/WorkOrderInfoContext";
import {
    endWorkOrderAction,
    startWorkOrderAction,
} from "../../work-order.action";
import { toast } from "sonner";

const DialogStartWorkOrder = () => {
    const workOrderContext = useContext(WorkOrderInfoContext);
    const workOrderID = useMemo(() => {
        if (workOrderContext) {
            const [state, setState] = workOrderContext;
            return state?.id ?? null;
        }
        return null;
    }, [workOrderContext]);

    const handleStart = async () => {
        if (workOrderID) {
            const toastId = toast.loading("Loading…");
            const response = await startWorkOrderAction(workOrderID + "");
            if (response.status == "success") {
                toast.success(`Work order successfully started`, {
                    id: toastId,
                });
            } else {
                toast.error(response.error?.message, {
                    id: toastId,
                });
            }
        } else {
            toast.error("Can't start work order!");
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Start Work Order</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        Through this action, you will update the work order
                        process by changing its status to In Progress.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2 w-full">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleStart}>Yes</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const formSchema = z.object({
    quantity: z.coerce.number(),
});

const DialogCompleteWorkOrder = () => {
    const workOrderContext = useContext(WorkOrderInfoContext);
    const workOrderID = useMemo(() => {
        if (workOrderContext) {
            const [state, setState] = workOrderContext;
            return state?.id ?? null;
        }
        return null;
    }, [workOrderContext]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            quantity: 0,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (workOrderID) {
            const toastId = toast.loading("Loading…");
            const response = await endWorkOrderAction(
                workOrderID,
                values.quantity
            );
            if (response.status == "success") {
                toast.success(`Work order successfully set to complete`, {
                    id: toastId,
                });
            } else {
                toast.error(response.error?.message, {
                    id: toastId,
                });
            }
        } else {
            toast.error("Can't end work order!");
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Complete Work Order</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        Through this action, you will end the work order process
                        by changing its status to Completed.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mt-5 space-y-3"
                    >
                        <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Quantity Produced</FormLabel>
                                    <FormControl>
                                        <Input
                                            required
                                            type="number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end gap-2 w-full">
                            <DialogClose asChild>
                                <Button variant="secondary">Cancel</Button>
                            </DialogClose>
                            <Button>Yes</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default function ActionButtonSection() {
    const workOrderContext = useContext(WorkOrderInfoContext);
    const workOrderStatus = useMemo(() => {
        if (workOrderContext) {
            const [state, setState] = workOrderContext;
            return state?.status ?? "";
        }
        return "";
    }, [workOrderContext]);
    return (
        <div className="flex justify-end gap-3">
            {workOrderStatus === "PENDING" && <DialogStartWorkOrder />}
            {workOrderStatus === "IN_PROGRESS" && <DialogCompleteWorkOrder />}
        </div>
    );
}
