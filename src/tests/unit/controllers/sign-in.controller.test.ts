import {
    AuthenticationError,
    InputParsedError,
} from "@/lib/entities/errors/common";
import { SessionDTO } from "@/lib/entities/models/session.model";
import { signInController } from "@/lib/interface-adapters/controllers/sign-in.controller";

import { expect, it, describe, expectTypeOf } from "vitest";

const mockUser = {
    email: "luthfi@irfan.com",
    password: "password",
};

describe("Login Controller", () => {
    it("should return a token when login is successful", async () => {
        const signInResult = await signInController(mockUser);

        expectTypeOf(signInResult).toEqualTypeOf<SessionDTO>();
        expect(signInResult.session).toBeDefined();
        expect(signInResult.user).toBeDefined();
    });

    it("should throw an error when user does not exist", async () => {
        await expect(
            signInController({
                email: "hello@world.com",
                password: "password",
            })
        ).rejects.toThrow(AuthenticationError);
    });

    it("should throw an error when email not in right format", async () => {
        await expect(
            signInController({
                email: "helloworld.com",
                password: "password",
            })
        ).rejects.toThrow(InputParsedError);
    });
});
