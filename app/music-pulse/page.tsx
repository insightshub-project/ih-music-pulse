import Link from "next/link";

function t(lang: string) {
  switch (lang) {
    case "sv": return { h: "SKANNA FÖR ATT LYSSNA", p: "Upptäck kvällens spellista och låt musiken följa dig hem." };
    case "no": return { h: "SKANN FOR Å LYTTE", p: "Finn kveldens spilleliste – ta rytmen med deg hjem." };
    default:   return { h: "SCAN TO LISTEN", p: "Discover tonight’s playlist." };
  }
}

export default async function MusicPulse({ searchParams }: { searchParams: { qr?: string; lang?: string } }) {
  const qr = searchParams.qr ?? "music001";
  const lang = (searchParams.lang ?? "en").slice(0, 2);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/studio/poster/${qr}?lang=${lang}`, { cache: "no-store" });
  const cfg = res.ok ? await res.json() : null;

  const copy = cfg ? { h: cfg.headline, p: cfg.tagline } : t(lang);
  const spotify = cfg?.links?.spotify ?? "https://open.spotify.com";
  const youtube = cfg?.links?.youtube ?? "https://youtube.com";

  fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/pulse/scan?qr=${encodeURIComponent(qr)}&lang=${encodeURIComponent(lang)}`).catch(() => {});

  return (
    <main style={{ minHeight: "100dvh", display: "grid", placeItems: "center", background:"#111", color:"#EDE2D1" }}>
      <div style={{ display: "grid", gap: 16, textAlign: "center", padding: 24, maxWidth: 520 }}>
        <h1 style={{ letterSpacing: ".04em", fontWeight: 800 }}>{copy.h}</h1>
        <p style={{ opacity: 0.8 }}>{copy.p}</p>
        <div style={{ display: "grid", gap: 10 }}>
          <Link href={spotify} target="_blank" style={{ border:"1px solid #5EF38C", color:"#5EF38C", padding:"12px 16px", borderRadius:12, textDecoration:"none" }}>Open on Spotify</Link>
          <Link href={youtube} target="_blank" style={{ border:"1px solid #5EF38C", color:"#5EF38C", padding:"12px 16px", borderRadius:12, textDecoration:"none" }}>Open on YouTube</Link>
        </div>
        <p style={{ opacity: .6, fontStyle: "italic" }}>From scene to screen – InsightHub Studio™</p>
      </div>
    </main>
  );
}
