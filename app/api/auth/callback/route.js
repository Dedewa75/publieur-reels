import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  const base =
    process.env.RENDER_EXTERNAL_URL || "https://publieur-reels.onrender.com";
  const fail = (msg) =>
    NextResponse.redirect(base + "/?erreur=" + encodeURIComponent(msg));
  try {
    const url = new URL(req.url);
    if (url.searchParams.get("error")) return fail("Connexion refusée");
    const rawCode = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const saved = req.cookies.get("ig_state")?.value;
    if (!rawCode || !state || state !== saved) {
      return fail("Connexion invalide, réessaie");
    }
    const code = rawCode.replace(/#_$/, "");

    const form = new URLSearchParams({
      client_id: process.env.IG_APP_ID || "",
      client_secret: process.env.IG_APP_SECRET || "",
      grant_type: "authorization_code",
      redirect_uri: base + "/api/auth/callback",
      code,
    });
    const r1 = await fetch("https://api.instagram.com/oauth/access_token", {
      method: "POST",
      body: form,
    });
    const j1 = await r1.json();
    const d1 = j1.data ? j1.data[0] : j1;
    if (!r1.ok || !d1?.access_token) {
      return fail(j1.error_message || j1.error?.message || "Échec de la connexion");
    }

    const r2 = await fetch(
      "https://graph.instagram.com/access_token?grant_type=ig_exchange_token" +
        "&client_secret=" +
        encodeURIComponent(process.env.IG_APP_SECRET || "") +
        "&access_token=" +
        encodeURIComponent(d1.access_token)
    );
    const j2 = await r2.json();
    if (!r2.ok || !j2.access_token) {
      return fail(j2.error?.message || "Échec du token long");
    }

    const fiftyDays = 60 * 60 * 24 * 50;
    const res = NextResponse.redirect(base + "/");
    res.cookies.set("ig_token", j2.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: Math.min(j2.expires_in || fiftyDays, fiftyDays),
      path: "/",
    });
    res.cookies.delete("ig_state");
    return res;
  } catch (e) {
    return fail("Erreur : " + e.message);
  }
}
