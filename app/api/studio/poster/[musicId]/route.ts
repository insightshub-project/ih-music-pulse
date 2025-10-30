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
};

type LangKey = keyof typeof COPY["music001"];

export async function GET(request: NextRequest, context: any) {
  const { musicId } = await context.params as any;
  const key = musicId as keyof typeof COPY;

  let lang = (new URL(request.url).searchParams.get("lang") ?? "en").slice(0, 2);
  if (!["sv", "en"].includes(lang)) lang = "en";

  const node = COPY[key];
  if (!node) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const data = node[lang as LangKey];
  return NextResponse.json({ id: key, ...data });
}
