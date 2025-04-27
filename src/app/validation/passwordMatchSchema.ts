import { z } from "zod";
import { passwordSchema } from "./passwordSchema";

// パスワードの確認
export const passwordMatchSchema = z
  .object({
    password: passwordSchema,
    passwordConfirm: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["passwordConfirm"],
        message: "パスワードが一致しません",
      });
    }
  });