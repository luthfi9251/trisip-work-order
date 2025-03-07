"use server";

import { URL } from "@/constant/url";
import {
    AuthenticationError,
    InputParsedError,
} from "@/lib/entities/errors/common";
import { ServerResponse } from "@/lib/entities/models/response.model";
import { SessionDTO } from "@/lib/entities/models/session.model";
import { getUserSessionController } from "@/lib/interface-adapters/controllers/get-session.controller";
import { signInController } from "@/lib/interface-adapters/controllers/sign-in.controller";
import { signOutUserController } from "@/lib/interface-adapters/controllers/sign-out.controller";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export const loginUser = async (
    email: string,
    password: string
): Promise<ServerResponse<null>> => {
    try {
        const COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
        const response = await signInController({ email, password });
        const cookieStore = await cookies();

        if (response) {
            cookieStore.set("session_id", response, {
                httpOnly: true,
                maxAge: COOKIE_MAX_AGE,
            });
        } else {
            throw new AuthenticationError("Error creating session!");
        }

        redirect("/work-order");
    } catch (err: any) {
        if (err.message === "NEXT_REDIRECT") throw err;
        if (err instanceof AuthenticationError) {
            return {
                status: "error",
                data: null,
                error: {
                    message: err.message,
                    type: err.name,
                },
            };
        }

        if (err instanceof InputParsedError) {
            return {
                status: "error",
                data: null,
                error: {
                    message: err.message,
                    type: err.name,
                    meta: err.fields,
                },
            };
        }
        console.log(err);
        return {
            status: "error",
            data: null,
            error: {
                message: "Something went wrong",
                type: "UNKNOWN_ERROR",
            },
        };
    }
};

export const logOutUserAction = async () => {
    const cookieStore = await cookies();
    const session_id = cookieStore.get("session_id");
    if (!session_id) {
        return null;
    }
    await signOutUserController(session_id.value);
    cookieStore.delete("session_id");
    redirect(URL.LOGIN);
};

export const getUserSession = cache(async (): Promise<SessionDTO | null> => {
    const session_id = (await cookies()).get("session_id");
    if (!session_id) {
        return null;
    }
    const response = await getUserSessionController(session_id.value);
    if (response.session) {
        return response;
    } else {
        return null;
    }
});

export const sidaBarUserInfo = async () => {
    let session = await getUserSession();

    if (session && session.user) {
        return {
            name: session.user.name,
            email: session.user.email,
            role: session.user.role,
            avatar: "/avatars/shadcn.jpg",
        };
    } else {
        return {
            name: "shadcn",
            email: "",
            role: "Admin",
            avatar: "/avatars/shadcn.jpg",
        };
    }
};
