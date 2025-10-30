import { NextRequest, NextResponse } from "next/server";

const COPY = {
  music001: {
    sv: {
      headline: "SKANNA FÖR ATT LYSSNA",
      tagline: "Upptäck kvällens spellista och låt musiken följa dig hem.",
      links: { spotify: "https://open.spotify.com/playlist/4abc123" }
    },
    en: {
      headline: "SCAN TO LISTEN",
      tagline: "Discover tonight’s playlist.",
      links: { spotify: "https://open.spotify.com/playlist/4abc123" }
    }
  }
} as const;

type PosterKey = keyof typeof COPY;                         // "music001"
type PosterLang<K extends PosterKey> = keyof typeof COPY[K]; // "sv" | "en"

export async function GET(request: NextRequest, context: any) {
  const { musicId } = (await context.params) as { musicId: string };
  const key = musicId as PosterKey;

  let lang = (new URL(request.url).searchParams.get("lang") ?? "en").slice(0,2) as string;
  const node = COPY[key];
  if (!node) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const hasLang = (lang in node) ? (lang as PosterLang<typeof key>) : ("en" as PosterLang<typeof key>);
  const data = node[hasLang];

  return NextResponse.json({ id: key, ...data });
}
