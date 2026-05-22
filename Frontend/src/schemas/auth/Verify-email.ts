import { z } from "zod";

export const verifyEmailCodeSchema = z.object({
  verificationCode: z
    .string()
    .min(6, "Verification code must be 6 digits")
    .max(6, "Verification code must be 6 digits")
    .regex(/^[0-9]+$/, "Verification code must contain only numbers"),
});

export type VerifyEmailCodeFormData = z.infer<
  typeof verifyEmailCodeSchema
>;