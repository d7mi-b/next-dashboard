import { z } from 'zod'

export const LoginFormSchema = z.object({
    username: z.string().min(1, { message: "Please enter a valid email address." }),
    password: z.string().min(1, { message: "Password is required." }),
})