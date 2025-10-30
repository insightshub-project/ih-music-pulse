import { NextRequest, NextResponse } from "next/server";

const fallback = {
  music001: {
    webapp: "/music-pulse?qr=music001",
    spotify: "https://open.spotify.com/playlist/4abc123"
  }
} as const;

type QRKey = keyof typeof fallback;
type Target = (typeof fallback)[QRKey];

// Miljö-override: tillåt valfri nyckel
function readTargets(): Record<string, Target> {
  try {
    if (!process.env.TARGETS_JSON) return {};
    const parsed = JSON.parse(process.env.TARGETS_JSON);
    return parsed as Record<string, Target>;
  } catch {
    return {};
  }
}

export async function GET(request: NextRequest, context: any) {
  const { musicId } = (await context.params) as { musicId: string };
  const key = (musicId as QRKey);
  const ua = (request.headers.get("user-agent") ?? "").toLowerCase();

  const fromEnv = readTargets();
  const t = (fromEnv[musicId] ?? fallback[key]) as Target | undefined;
  if (!t) return NextResponse.json({ error: "QR not found" }, { status: 404 });

  const isIGorIOS = ua.includes("instagram") || ua.includes("iphone");
  const target = isIGorIOS ? t.webapp : (t.spotify ?? t.webapp);

  return NextResponse.redirect(new URL(target, request.url), 302);
}
