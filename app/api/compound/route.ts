import {  NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: "Compound API endpoint" });
}