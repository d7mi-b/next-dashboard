import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { params, sessionId } = await req.json();

    if (!process.env.ODOO_APP_URL) {
        console.error('Missing ODOO_APP_URL');
        return NextResponse.json({ status: false, message: 'Service misconfigured' }, { status: 500 });
    }

    try {
        // Example: Fetching partners
        const odooResponse = await axios.post(`${process.env.ODOO_APP_URL}/web/dataset/call_kw`, {
                jsonrpc: '2.0',
                method: 'call',
                params: params,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': `session_id=${sessionId}`,
                },
            }
        );

        const odooData = odooResponse.data;

        if (odooData.result != null) {
            return NextResponse.json({ status: true, data: odooData.result });
        } else {
            const message = typeof odooData.error === 'string'
                ? odooData.error
                : odooData.error?.data?.message ?? 'Failed to fetch data';

                console.error('Odoo error response:', odooData.error);
                console.error("Message: ", message);

            return NextResponse.json({ status: false, message }, { status: 400 });
        }
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            return NextResponse.json({ status: false, message: error.response?.data }, { status: 500 });
        }

        return NextResponse.json({ status: false, message: 'Internal server error' }, { status: 500 });
    }
}