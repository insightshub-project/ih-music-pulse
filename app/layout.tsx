export const metadata = {
  title: "IH Music Pulse",
  description: "From scene to screen – InsightHub Studio"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <script dangerouslySetInnerHTML={{
          __html: "if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('/sw.js').catch(console.error); }); }"
        }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
