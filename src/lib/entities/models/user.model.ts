export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
}

export type CreateUserDTO = Omit<User, "id">;
export type LoginUserDTO = Pick<User, "email" | "password">;

export interface Role {
    id: number;
    role_name: Partial<typeof UserRole>;
}

export const UserRole = {
    PRODUCTION_MANAGER: "PRODUCTION_MANAGER",
    OPERATOR: "OPERATOR",
};
