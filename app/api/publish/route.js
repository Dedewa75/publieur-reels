import { promises as fs } from "fs";
import path from "path";
import os from "os";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

const GRAPH = "https://graph.instagram.com/v25.0";
const DIR = path.join(os.tmpdir(), "reels");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function call(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: "Bearer " + process.env.IG_TOKEN,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(data.error?.message || "Erreur Instagram");
  }
  return data;
}

export async function POST(req) {
  const code = process.env.APP_CODE;
  if (!code || req.headers.get("x-code") !== code) {
    return Response.json({ error: "Code d'accès incorrect" }, { status: 401 });
  }
  if (!process.env.IG_TOKEN) {
    return Response.json({ error: "IG_TOKEN manquant" }, { status: 500 });
  }
  try {
    const { id, caption } = await req.json();
    if (!/^[a-f0-9-]{36}$/.test(id || "")) {
      return Response.json({ error: "Vidéo inconnue" }, { status: 400 });
    }
    const base =
      process.env.RENDER_EXTERNAL_URL || "https://" + req.headers.get("host");
    const videoUrl = base + "/api/video?id=" + id;

    const me = await call(GRAPH + "/me?fields=user_id");
    const igId = me.user_id || "me";

    const container = await call(GRAPH + "/" + igId + "/media", {
      method: "POST",
      body: JSON.stringify({
        media_type: "REELS",
        video_url: videoUrl,
        caption: caption || "",
      }),
    });

    let ready = false;
    for (let i = 0; i < 60; i++) {
      await sleep(5000);
      const st = await call(
        GRAPH + "/" + container.id + "?fields=status_code,status"
      );
      if (st.status_code === "FINISHED") {
        ready = true;
        break;
      }
      if (st.status_code === "ERROR" || st.status_code === "EXPIRED") {
        throw new Error(
          "Instagram a refusé la vidéo (" + (st.status || st.status_code) + ")"
        );
      }
    }
    if (!ready) throw new Error("Délai dépassé pendant le traitement");

    const pub = await call(GRAPH + "/" + igId + "/media_publish", {
      method: "POST",
      body: JSON.stringify({ creation_id: container.id }),
    });
    await fs.unlink(path.join(DIR, id + ".mp4")).catch(() => {});
    return Response.json({ ok: true, mediaId: pub.id });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
