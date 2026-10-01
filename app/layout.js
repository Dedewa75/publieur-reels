export const metadata = {
  title: "Publieur de Reels",
  description: "1 vidéo = 1 Reel indépendant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          background: "#0a0a0f",
          color: "#f2f4ff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
