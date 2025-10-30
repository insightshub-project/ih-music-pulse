import { NextRequest, NextResponse } from "next/server";

const fallback = {
  music001: {
    webapp: "/music-pulse?qr=music001",
    spotify: "https://open.spotify.com/playlist/4abc123"
  }
};

type QRKey = keyof typeof fallback; // 'music001'

export async function GET(request: NextRequest, context: any) {
  const { musicId } = await context.params as any;
  const key = musicId as QRKey;
  const ua = (request.headers.get("user-agent") ?? "").toLowerCase();

  const fromEnv = process.env.TARGETS_JSON ? JSON.parse(process.env.TARGETS_JSON) : {};
  const t = fromEnv[key] ?? fallback[key];
  if (!t) return NextResponse.json({ error: "QR not found" }, { status: 404 });

  const isIGorIOS = ua.includes("instagram") || ua.includes("iphone");
  const target = isIGorIOS ? t.webapp : (t.spotify ?? t.webapp);

  return NextResponse.redirect(new URL(target, request.url), 302);
}
