import { createSession } from "@/lib/session";
import axios from "axios";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    try {
        const odooResponse = await fetch(process.env.ODOO_APP_URL + '/web/session/authenticate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jsonrpc: '2.0', method: 'call', params: { db: process.env.ODOO_APP_DB, login: body.username, password: body.password } }),
        });

        const odooData = await odooResponse.json();

        if (odooData.result) {
            const cookies = odooResponse.headers.get('set-cookie');
            const sessionId = cookies?.split(';')[0].split('=')[1] as string;

            await createSession(sessionId);

            return NextResponse.json({ status: true, message: 'Login successful', uid: odooData.result.uid });
        } else {
            console.error('Odoo auth failed:', odooData?.error ?? odooData);
            return NextResponse.json(
                { status: false, message: 'Invalid credentials' },
                { status: 401 }
            );
        }
    } catch (error) {
        console.error('Odoo login error:', error);
        return NextResponse.json({ status: false, message: 'Internal server error' }, { status: 500 });
    }
}