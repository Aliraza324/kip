import { z } from "zod";
import { studentLoginMock } from "@/mocks";

const { validation } = studentLoginMock;

export const studentLoginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, { message: validation.usernameRequired }),
  password: z
    .string()
    .min(1, { message: validation.passwordRequired })
    .min(6, { message: validation.passwordMin }),
});

