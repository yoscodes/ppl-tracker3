import { z } from "zod";
// パスワードは最低5文字
export const passwordSchema = z
  .string()
  .min(5, "パスワードは5文字以上でなければなりません");