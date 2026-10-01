import { promises as fs } from "fs";
import path from "path";
import os from "os";
import crypto from "crypto";

export const dynamic = "force-dynamic";

const DIR = path.join(os.tmpdir(), "reels");

export async function POST(req) {
  const code = process.env.APP_CODE;
  if (!code || req.headers.get("x-code") !== code) {
    return Response.json({ error: "Code d'accès incorrect" }, { status: 401 });
  }
  const form = await req.formData();
  const file = form.get("file");
  if (!file) {
    return Response.json({ error: "Aucun fichier" }, { status: 400 });
  }
  await fs.mkdir(DIR, { recursive: true });
  const id = crypto.randomUUID();
  const buf = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(DIR, id + ".mp4"), buf);
  return Response.json({ id });
}

export async function GET(req) {
  const id = new URL(req.url).searchParams.get("id") || "";
  if (!/^[a-f0-9-]{36}$/.test(id)) {
    return new Response("bad id", { status: 400 });
  }
  try {
    const buf = await fs.readFile(path.join(DIR, id + ".mp4"));
    return new Response(buf, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Length": String(buf.length),
      },
    });
  } catch {
    return new Response("not found", { status: 404 });
  }
}
