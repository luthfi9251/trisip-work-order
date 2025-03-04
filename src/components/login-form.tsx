"use client";

import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { loginUser } from "@/app/auth.action";
import { ServerResponse } from "@/lib/entities/models/response.model";
import { Button } from "./ui/button";
import { CircleX, LoaderCircle } from "lucide-react";
import { useMemo, useState } from "react";

const FormInformation = ({
    status,
    message,
}: {
    status: "pending" | "error" | "idle";
    message?: string;
}) => {
    const messageInfo = useMemo(
        () => ({
            pending: "Sign you in...",
            error: "Account not found. Please check your email and password",
        }),
        []
    );
    if (status === "idle") return null;

    return (
        <div
            className={cn(
                "flex w-full gap-2 p-2 rounded text-sm items-center",
                status === "pending" && "bg-slate-100",
                status === "error" && "bg-red-500 text-white"
            )}
        >
            {status === "pending" && (
                <LoaderCircle className="animate-spin" size={20} />
            )}
            {status === "error" && <CircleX className="" size={30} />}
            <p>{messageInfo[status]}</p>
        </div>
    );
};

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [formStatus, setFormStatus] = useState<"idle" | "pending" | "error">(
        "idle"
    );
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setFormStatus("pending");
        let response: ServerResponse<null> = await loginUser(
            values.email,
            values.password
        );
        if (response.status === "error") {
            setFormStatus("error");
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input required {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                required
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormInformation status={formStatus} />

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={formStatus === "pending"}
                            >
                                Submit
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
