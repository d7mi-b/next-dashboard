import { LoginFormSchema } from "@/lib/definitions";
import axios from "axios";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function login(values: z.infer<typeof LoginFormSchema>) {
    // Call the provider or db to create a user...
    const result = await axios.post('/api/login', values)
        .then((res) => res.data)
        .catch((err) => console.log("Error", err));

    console.log(result);
    if (result.status) {
        redirect('/');
    } else {
        return {
            status: false,
            message: "Login Failed",
        }
    }
}