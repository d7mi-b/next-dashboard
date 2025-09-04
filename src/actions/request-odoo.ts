"use server";

import { verifySession } from "@/lib/dal";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    withCredentials: true,
});

export async function requestOdoo(params: any) {
    const sesstion = await verifySession();

    params.id = new Date().getTime();

    console.log("request odoo model: ", params.model);

    try {
        const odooResponse = await axiosInstance.post('api/odoo', {
            "params": params,
            "sessionId": sesstion.session_id,
        });

        const odooData = await odooResponse.data;
        
        // console.log("requestOdoo: ", odooData);

        if (odooData.status) {
            return {
                result: odooData.data,
                error: null,
            }
        } else {
            // console.error('Odoo request error:', odooData.message);
            return {
                result: null,
                error: odooData.message || 'Failed to fetch data',
            };
        }
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            // console.log("Axios error:", error.response?.data);
            return {
                result: null,
                error: error.response?.data?.message || 'Failed to fetch data',
            };
        }

        return {
            result: null,
            error: error.message || 'Failed to fetch data',
        }
    }
}