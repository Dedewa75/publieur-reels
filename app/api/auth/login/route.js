import { NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function GET() {
  const base =
    process.env.RENDER_EXTERNAL_URL || "https://publieur-reels.onrender.com";
  const state = crypto.randomUUID();
  const url =
    "https://www.instagram.com/oauth/authorize" +
    "?client_id=" +
    encodeURIComponent(process.env.IG_APP_ID || "") +
    "&redirect_uri=" +
    encodeURIComponent(base + "/api/auth/callback") +
    "&response_type=code" +
    "&scope=" +
    encodeURIComponent(
      "instagram_business_basic,instagram_business_content_publish"
    ) +
    "&state=" +
    state;
  const res = NextResponse.redirect(url);
  res.cookies.set("ig_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });
  return res;
}
