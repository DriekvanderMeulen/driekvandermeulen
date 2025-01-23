import { NextResponse } from 'next/server';
import argon2 from 'argon2';

export async function POST(req: Request) {
    const { code, serverKey } = await req.json();

    try {
        if (await argon2.verify(serverKey, code)) {
            return NextResponse.json({ authenticated: true });
        } else {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }
    } catch {
        return NextResponse.json({ error: 'Error verifying code' }, { status: 500 });
    }
}