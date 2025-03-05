import { AuthContext } from "@/components/context/AuthContext";
import { useContext } from "react";

export default function useRoleCheck(role: string) {
    const session = useContext(AuthContext);
    return role === session?.user?.role;
}
