import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Mohamed Mostafa Metawea, AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0b1220 0%, #0f2a2e 60%, #064e3b 100%)",
          color: "#f8fafc",
        }}
      >
        <div style={{ fontSize: 30, color: "#34d399", letterSpacing: 2, marginBottom: 24 }}>AI ENGINEER · EGYPT</div>
        <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1.05 }}>Mohamed Mostafa</div>
        <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1.05, color: "#2dd4bf" }}>Metawea</div>
        <div style={{ fontSize: 36, color: "#cbd5e1", marginTop: 32 }}>Generative AI, RAG and Agentic Systems</div>
        <div style={{ fontSize: 28, color: "#94a3b8", marginTop: 20 }}>mohamed-mostafa-metawea.vercel.app</div>
      </div>
    ),
    { ...size }
  );
}
