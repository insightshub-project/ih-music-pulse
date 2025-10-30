import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const qr = url.searchParams.get("qr") ?? "unknown";
  const lang = url.searchParams.get("lang") ?? "en";
  console.log(JSON.stringify({ ts: new Date().toISOString(), event: "studio.qr.scan", qr, lang, ip: req.headers.get("x-forwarded-for") ?? "?" }));
  return NextResponse.json({ ok: true });
}
