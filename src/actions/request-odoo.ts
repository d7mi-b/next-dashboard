"use server";

import { verifySession } from "@/lib/dal";
import axios from "axios";

export async function requestOdoo(params: any) {
    const sesstion = await verifySession();

    params.id = new Date().getTime();

    try {
        const odooResponse = await axios.post(process.env.NEXT_PUBLIC_API_URL + 'api/odoo', {
            "params": params,
            "sessionId": sesstion.session_id,
        }, {
            withCredentials: true,
        });

        const odooData = await odooResponse.data;
        
        console.log("requestOdoo: ", odooData);

        if (odooData.status) {
            return odooData.data;
        } else {
            console.error('Odoo request error:', odooData.message);
            return odooData.message || 'Failed to fetch data';
        }
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            console.log("Axios error:", error.response?.data);
            return error.response?.data?.message || 'Failed to fetch data';
        }

        return error.message || 'Failed to fetch data';
    }
}