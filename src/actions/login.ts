import { LoginFormSchema } from "@/lib/definitions";
import axios from "axios";
import { z } from "zod";
import { requestOdoo } from "./request-odoo";
import { redirect } from "next/navigation";

export async function login(values: z.infer<typeof LoginFormSchema>) {
    // Call the provider or db to create a user...
    const result = await axios.post('/api/login', values)
        .then((res) => res.data)
        .catch((err) => console.log("Error", err));

    if (result.status) {
        const { result: userGroupIds} = await requestOdoo({
            "model": "res.users",
            "method": "read",
            "args": [
                [result.uid],
                ["groups_id"]
            ],
            "kwargs": {}
        });

        const permission = userGroupIds[0].groups_id;

        redirect('/');
    } else {
        return {
            status: false,
            message: "Login Failed",
        }
    }
}