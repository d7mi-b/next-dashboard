"use server";

import 'server-only'
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session'
import { cache } from 'react';
import { redirect } from 'next/navigation';

export const verifySession = cache(async () => {
    const cookie = (await cookies()).get('session')?.value

    if (!cookie) {
        return { isAuth: false, session_id: null }
    }

    const session = await decrypt(cookie)

    if (!session?.session_id) {
        redirect('/login')
    }

    return { isAuth: true, session_id: session.session_id }
})