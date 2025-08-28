import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { params, sessionId } = await req.json();

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

        const odooData = await odooResponse.data;

        if (odooData.result) {
            return NextResponse.json({ status: true, data: odooData.result });
        } else {
            const message = typeof odooData.error === 'string'
                ? odooData.error
                : odooData.error?.message ?? 'Failed to fetch data';

            return NextResponse.json({ status: false, message }, { status: 500 });
        }
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            return NextResponse.json({ status: false, message: error.response?.data }, { status: 500 });
        }

        console.error('Odoo data fetch error:', error);
        return NextResponse.json({ status: false, message: 'Internal server error' }, { status: 500 });
    }
}