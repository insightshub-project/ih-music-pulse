import { NextRequest, NextResponse } from "next/server";

const fallback: Record<string, { webapp: string; spotify?: string; youtube?: string }> = {
  music001: {
    webapp: "/music-pulse?qr=music001",
    spotify: "https://open.spotify.com/playlist/4abc123"
  }
};

export async function GET(req: NextRequest, { params }: { params: { musicId: string } }) {
  const id = params.musicId;
  const ua = (req.headers.get("user-agent") ?? "").toLowerCase();

  const fromEnv = process.env.TARGETS_JSON ? JSON.parse(process.env.TARGETS_JSON) : {};
  const t = fromEnv[id] ?? fallback[id];
  if (!t) return NextResponse.json({ error: "QR not found" }, { status: 404 });

  const isIGorIOS = ua.includes("instagram") || ua.includes("iphone");
  const target = isIGorIOS ? t.webapp : (t.spotify ?? t.webapp);

  console.log(JSON.stringify({ ts: new Date().toISOString(), event: "qr.scan", id, ua }));
  return NextResponse.redirect(new URL(target, req.url), 302);
}
