"use server";

import { verifySession } from "@/lib/dal";
import axios from "axios";

export async function requestOdoo(params: any) {
    const sesstion = await verifySession();

    try {
        const odooResponse = await axios.post(process.env.NEXT_PUBLIC_API_URL + 'api/odoo', {
            "params": params,
            "sessionId": sesstion.session_id,
        }, {
            withCredentials: true,
        });

        const odooData = await odooResponse.data;
        
        console.log(odooData);

        if (odooData.status) {
            return odooData.data;
        } else {
            return odooData.error?.message || 'Failed to fetch data';
        }
    } catch (error) {
        console.log(error);
        return [];
    }
}