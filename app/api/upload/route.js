import { promises as fs } from "fs";
import path from "path";
import os from "os";
import crypto from "crypto";

export const dynamic = "force-dynamic";

const DIR = path.join(os.tmpdir(), "reels");

async function tokenOk(token) {
  if (!token) return false;
  try {
    const r = await fetch(
      "https://graph.instagram.com/v25.0/me?fields=username",
      { headers: { Authorization: "Bearer " + token } }
    );
    return r.ok;
  } catch {
    return false;
  }
}

export async function POST(req) {
  const token = req.cookies.get("ig_token")?.value;
  if (!(await tokenOk(token))) {
    return Response.json(
      { error: "Non connecté à Instagram" },
      { status: 401 }
    );
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
