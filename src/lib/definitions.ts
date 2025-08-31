import { email, z } from 'zod'

export const LoginFormSchema = z.object({
    username: z.string().min(1, { message: "Please enter a valid email address." }),
    password: z.string().min(1, { message: "Password is required." }),
});

export const AddWherehouseFormSchema = z.object({
    name: z.string().min(1, { message: "Name field is required." }),
    address: z.string().min(1, { message: "Address field is required." }),
    isDefault: z.boolean().optional(),
});

export const AddPartnerFormSchema = z.object({
    name: z.string().min(1, { message: "Name field is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z.string().regex(/^((\+|00)?9665\d{8}|(\+|00)?9677[01378]\d{7}|05\d{8}|7[01378]\d{7})$/, { message: "Invalid phone number." }),
    image_1920: z.string().optional(),
});

export const EditPartnerFormSchema = z.object({
    id: z.number(),
    name: z.string().min(1, { message: "Name field is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z.string().regex(/^((\+|00)?9665\d{8}|(\+|00)?9677[01378]\d{7}|05\d{8}|7[01378]\d{7})$/, { message: "Invalid phone number." }),
    image_1920: z.string().optional(),
});

export type AddPartnerActionState = {
    name?: string;
    email?: string;
    phone?: string;
    errors?: {
        name?: string[];
        email?: string[];
        phone?: string[];
    };
};