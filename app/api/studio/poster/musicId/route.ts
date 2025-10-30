import { NextRequest, NextResponse } from "next/server";

const COPY: Record<string, any> = {
  music001: {
    en: { headline: "SCAN TO LISTEN", tagline: "Discover tonight’s playlist.", links: { spotify: "https://open.spotify.com/playlist/4abc123", youtube: "https://youtube.com/playlist?list=PL123" } },
    sv: { headline: "SKANNA FÖR ATT LYSSNA", tagline: "Upptäck kvällens spellista och låt musiken följa dig hem.", links: { spotify: "https://open.spotify.com/playlist/4abc123" } },
    no: { headline: "SKANN FOR Å LYTTE", tagline: "Finn kveldens spilleliste – ta rytmen med deg hjem.", links: { spotify: "https://open.spotify.com/playlist/4abc123" } }
  }
};

export async function GET(request: NextRequest, context: any) {
  const { musicId } = await context.params as any;
  const lang = (new URL(request.url).searchParams.get("lang") ?? "en").slice(0,2);
  const node = COPY[musicId];
  if (!node) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const data = node[lang] ?? node["en"];
  return NextResponse.json({ id: musicId, ...data });
}
