import { NextResponse } from 'next/server';
import argon2 from 'argon2';

export async function GET() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const key = `35${day}${month}`;

    try {
        const hashedKey = await argon2.hash(key);
        return NextResponse.json({ key: hashedKey });
    } catch (err) {
        return NextResponse.json({ error: 'Error generating key' }, { status: 500 });
    }
}