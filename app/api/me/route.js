import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  const token = req.cookies.get("ig_token")?.value;
  if (!token) return NextResponse.json({ connected: false });
  try {
    const r = await fetch(
      "https://graph.instagram.com/v25.0/me?fields=username",
      { headers: { Authorization: "Bearer " + token } }
    );
    const j = await r.json();
    if (!r.ok || j.error) {
      const res = NextResponse.json({ connected: false });
      res.cookies.delete("ig_token");
      return res;
    }
    return NextResponse.json({ connected: true, username: j.username });
  } catch {
    return NextResponse.json({ connected: false });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.delete("ig_token");
  return res;
}
