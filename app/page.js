"use client";
import { useState, useRef } from "react";

const BLUE = "#2f6bff";
const card = {
  background: "#14141f",
  border: "1px solid #24243a",
  borderRadius: 14,
  padding: 14,
};
const field = {
  width: "100%",
  boxSizing: "border-box",
  background: "#0a0a0f",
  color: "#f2f4ff",
  border: "1px solid #24243a",
  borderRadius: 10,
  padding: 10,
  fontSize: 16,
  marginBottom: 8,
};
const btn = (bg, color = "#fff") => ({
  background: bg,
  color,
  border: "none",
  borderRadius: 12,
  padding: "12px 16px",
  fontSize: 16,
  fontWeight: 700,
  cursor: "pointer",
});

export default function Page() {
  const [items, setItems] = useState([]);
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [code, setCode] = useState("");
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(0);
  const input = useRef(null);

  function addFiles(e) {
    const files = Array.from(e.target.files || []);
    const news = files.map((f, i) => ({
      id: Date.now() + "-" + i,
      file: f,
      url: URL.createObjectURL(f),
      status: "attente",
      error: "",
    }));
    setItems((prev) => [...prev, ...news]);
    e.target.value = "";
  }

  function remove(id) {
    setItems((prev) => prev.filter((x) => x.id !== id));
  }

  function move(i, dir) {
    setItems((prev) => {
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const copy = [...prev];
      [copy[i], copy[j]] = [copy[j], copy[i]];
      return copy;
    });
  }

  async function publish() {
    if (running || items.length === 0) return;
    if (!code) {
      alert("Entre ton code d'accès.");
      return;
    }
    setRunning(true);
    setDone(0);
    setItems((prev) =>
      prev.map((x) => ({ ...x, status: "attente", error: "" }))
    );
    const text = [caption.trim(), hashtags.trim()].filter(Boolean).join("\n\n");
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const set = (status, error = "") =>
        setItems((prev) =>
          prev.map((x) => (x.id === it.id ? { ...x, status, error } : x))
        );
      try {
        set("envoi de la vidéo…");
        const form = new FormData();
        form.append("file", it.file);
        const up = await fetch("/api/video", {
          method: "POST",
          headers: { "x-code": code },
          body: form,
        });
        const upData = await up.json().catch(() => ({}));
        if (!up.ok) throw new Error(upData.error || "Échec de l'envoi");

        set("traitement par Instagram…");
        const pub = await fetch("/api/publish", {
          method: "POST",
          headers: { "x-code": code, "Content-Type": "application/json" },
          body: JSON.stringify({ id: upData.id, caption: text }),
        });
        const pubData = await pub.json().catch(() => ({}));
        if (!pub.ok) throw new Error(pubData.error || "Échec de la publication");

        set("réussi");
      } catch (e) {
        set("échec", e.message);
      }
      setDone(i + 1);
    }
    setRunning(false);
  }

  const total = items.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const ok = items.filter((x) => x.status === "réussi").length;
  const ko = items.filter((x) => x.status === "échec").length;
  const color = (s) =>
    s === "réussi"
      ? "#22c55e"
      : s === "échec"
      ? "#ef4444"
      : s === "attente"
      ? "#8888a8"
      : BLUE;

  return (
    <main style={{ maxWidth: 560, margin: "0 auto", padding: 16 }}>
      <h1 style={{ fontSize: 26, margin: "8px 0 4px" }}>
        Publieur de <span style={{ color: BLUE }}>Reels</span>
      </h1>
      <p style={{ color: "#8888a8", marginTop: 0 }}>
        1 vidéo = 1 Reel indépendant. Aucune fusion.
      </p>

      <input
        ref={input}
        type="file"
        accept="video/*"
        multiple
        onChange={addFiles}
        style={{ display: "none" }}
      />
      <button
        onClick={() => input.current.click()}
        style={{ ...btn(BLUE), width: "100%", marginBottom: 14 }}
      >
        Sélectionner mes vidéos
      </button>

      <div style={{ ...card, marginBottom: 14 }}>
        <input
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Code d'accès"
          style={field}
        />
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Légende (pour tous les Reels)"
          rows={3}
          style={field}
        />
        <input
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
          placeholder="#hashtags #séparés #par-des-espaces"
          style={{ ...field, marginBottom: 0 }}
        />
      </div>

      {total > 0 && (
        <div style={{ ...card, marginBottom: 14 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>
            Publication {done} / {total} — {pct} %
          </div>
          <div
            style={{
              height: 12,
              background: "#0a0a0f",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: pct + "%",
                height: "100%",
                background: BLUE,
                transition: "width .3s",
              }}
            />
          </div>
          <div style={{ marginTop: 8, color: "#8888a8" }}>
            ✅ {ok} réussi(s) · ❌ {ko} échec(s)
          </div>
        </div>
      )}

      <div style={{ display: "grid", gap: 10 }}>
        {items.map((it, i) => (
          <div
            key={it.id}
            style={{ ...card, display: "flex", gap: 12, alignItems: "center" }}
          >
            <video
              src={it.url}
              muted
              playsInline
              preload="metadata"
              style={{
                width: 64,
                height: 90,
                objectFit: "cover",
                borderRadius: 8,
                background: "#000",
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontWeight: 600,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {i + 1}. {it.file.name}
              </div>
              <div style={{ color: color(it.status), fontSize: 14 }}>
                {it.status}
              </div>
              {it.error && (
                <div style={{ color: "#ff6b81", fontSize: 12 }}>{it.error}</div>
              )}
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                disabled={running}
                onClick={() => move(i, -1)}
                style={{ ...btn("#24243a"), padding: "8px 12px" }}
              >
                ↑
              </button>
              <button
                disabled={running}
                onClick={() => move(i, 1)}
                style={{ ...btn("#24243a"), padding: "8px 12px" }}
              >
                ↓
              </button>
              <button
                disabled={running}
                onClick={() => remove(it.id)}
                style={{ ...btn("#3a1a22", "#ff6b81"), padding: "8px 12px" }}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {total > 0 && (
        <button
          onClick={publish}
          disabled={running}
          style={{
            ...btn(running ? "#24243a" : BLUE),
            width: "100%",
            marginTop: 14,
          }}
        >
          {running ? "Publication en cours…" : "Publier " + total + " Reels"}
        </button>
      )}
    </main>
  );
                }
