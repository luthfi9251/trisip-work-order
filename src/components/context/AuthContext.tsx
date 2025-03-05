"use client";

import { SessionDTO } from "@/lib/entities/models/session.model";
import { ReactNode, createContext } from "react";

export const AuthContext = createContext<SessionDTO | null>(null);

export const AuthProvider = ({
    session,
    children,
}: {
    children: ReactNode;
    session: SessionDTO | null;
}) => {
    return (
        <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
    );
};
