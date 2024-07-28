import { z } from "zod";

export const userSchemaValidator = z.object({
  name: z.string().min(3, "Name is required.").max(255),
  username: z.string().min(3, "Name is required.").max(255),
  password: z
    .string()
    .min(6, "Password must have ati least 6 characters.")
    .max(255)
    .optional()
    .or(z.literal("")),
  role: z.string().min(3, "Role is required.").max(10),
});
