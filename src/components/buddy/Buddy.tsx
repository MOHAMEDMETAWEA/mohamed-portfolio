"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  /** Fixed, pre-written answers about Mohamed. No model is called. */
  answer: (question: string) => string;
};

const SECTION_LINES: Record<string, string> = {
  hero: "Oh! Hi! I'm Buddy. I'll show you around Mohamed's portfolio.",
  about: "Mohamed is an AI engineer. B.Sc. in Communication & Electronics Engineering, October 6 University, GPA 3.44/4.0.",
  skills: "Python, TensorFlow, Keras, LangChain, RAG, FastAPI, Docker. The full list is right here.",
  projects: "Real repos with real code. Team projects are labelled as team projects.",
  experience: "Machine Learning Intern at Cellula Technologies, Feb to Mar 2025.",
  certifications: "IBM AI Engineering, Deep Learning Specialization, AWS AI Practitioner and more.",
  contact: "Want to talk to Mohamed? The links are right here.",
};

const SECTION_ORDER = ["hero", "about", "skills", "projects", "experience", "certifications", "contact"];

const CHIPS: { label: string; q: string }[] = [
  { label: "Skills", q: "skills" },
  { label: "Projects", q: "projects" },
  { label: "Experience", q: "experience" },
  { label: "Education", q: "education" },
  { label: "Certifications", q: "certifications" },
  { label: "MedAgent", q: "medagent" },
  { label: "Contact", q: "contact" },
];

const DROP = 72;

export function Buddy({ answer }: Props) {
  const [phase, setPhase] = useState<"card" | "drop">("drop");
  const [booted, setBooted] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [open, setOpen] = useState(false);
  const [caption, setCaption] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [asked, setAsked] = useState<string | null>(null);
  const [talking, setTalking] = useState(false);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState(0);

  const drop = useRef<HTMLDivElement>(null);
  const eyes = useRef<HTMLDivElement>(null);
  const lastSection = useRef<string>("");
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typeTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  // Boot: first visit shows the terminal card, later visits go straight to the droplet.
  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduce(rm);
    let seen = false;
    try { seen = sessionStorage.getItem("buddy-intro") === "1"; } catch {}
    setPhase(rm || seen ? "drop" : "card");
    setBooted(true);
  }, []);

  // Typed terminal lines.
  useEffect(() => {
    if (!booted || phase !== "card") return;
    const t = [setTimeout(() => setLines(1), 500), setTimeout(() => setLines(2), 1300), setTimeout(() => setLines(3), 2000)];
    const auto = setTimeout(() => melt(), 11000);
    return () => { t.forEach(clearTimeout); clearTimeout(auto); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booted, phase]);

  const say = useCallback((text: string, hold = 6500) => {
    if (typeTimer.current) clearInterval(typeTimer.current);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setCaption(text);
    setTyped("");
    setTalking(true);
    let i = 0;
    const step = reduce ? text.length : 3;
    typeTimer.current = setInterval(() => {
      i += step;
      setTyped(text.slice(0, i));
      if (i >= text.length) {
        if (typeTimer.current) clearInterval(typeTimer.current);
        setTalking(false);
      }
    }, 18);
    return hold;
  }, [reduce]);

  const hideLater = useCallback((ms: number) => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setCaption(null), ms);
  }, []);

  const melt = useCallback(() => {
    try { sessionStorage.setItem("buddy-intro", "1"); } catch {}
    setPhase("drop");
    setTimeout(() => {
      const hold = say(SECTION_LINES[lastSection.current || "hero"]);
      hideLater(hold + 2500);
    }, reduce ? 0 : 1100);
  }, [say, hideLater, reduce]);

  // Eyes follow the pointer.
  useEffect(() => {
    const look = (cx: number, cy: number) => {
      const d = drop.current;
      const e = eyes.current;
      if (!d || !e) return;
      const r = d.getBoundingClientRect();
      const dx = cx - (r.left + r.width / 2);
      const dy = cy - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, dist / 220);
      e.style.setProperty("--ex", `${(dx / dist) * 4.5 * k}px`);
      e.style.setProperty("--ey", `${(dy / dist) * 4 * k}px`);
    };
    const m = (ev: MouseEvent) => look(ev.clientX, ev.clientY);
    const t = (ev: TouchEvent) => ev.touches[0] && look(ev.touches[0].clientX, ev.touches[0].clientY);
    window.addEventListener("mousemove", m);
    window.addEventListener("touchmove", t, { passive: true });
    return () => { window.removeEventListener("mousemove", m); window.removeEventListener("touchmove", t); };
  }, []);

  // Scroll captions: one short line per section, using only facts shown on the page.
  useEffect(() => {
    if (!booted) return;
    const els = SECTION_ORDER.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const ratios = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => ratios.set(en.target.id, en.isIntersecting ? en.intersectionRatio : 0));
        let best = "";
        let bestR = 0;
        ratios.forEach((r, id) => { if (r > bestR) { bestR = r; best = id; } });
        if (best && best !== lastSection.current) {
          lastSection.current = best;
          if (phaseRef.current === "drop" && !openRef.current && best !== "hero") {
            const hold = say(SECTION_LINES[best]);
            hideLater(hold + 1500);
          }
        }
      },
      { threshold: [0.15, 0.35, 0.6] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [booted, say, hideLater]);

  const openRef = useRef(open);
  openRef.current = open;

  const ask = (label: string, q: string) => {
    setAsked(label);
    say(answer(q));
    if (hideTimer.current) clearTimeout(hideTimer.current);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setInput("");
    ask(q, q);
  };

  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  useEffect(() => {
    if (phase !== "card") return;
    const k = (e: KeyboardEvent) => { if (e.key === "Enter" && lines >= 3) melt(); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [phase, lines, melt]);

  useEffect(() => () => {
    if (typeTimer.current) clearInterval(typeTimer.current);
    if (hideTimer.current) clearTimeout(hideTimer.current);
  }, []);

  if (!booted) return null;

  const isCard = phase === "card";

  return (
    <div className="buddy-root fixed bottom-4 left-4 z-[60] sm:bottom-6 sm:left-6" style={{ pointerEvents: "none" }}>
      {/* Speech bubble / Q&A panel */}
      <AnimatePresence>
        {!isCard && (open || caption) && (
          <motion.div
            key={open ? "panel" : "bubble"}
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="buddy-bubble mb-3 w-[min(21rem,calc(100vw-2rem))] rounded-2xl p-3.5 text-[13px] leading-relaxed"
            style={{ pointerEvents: "auto", transformOrigin: "bottom left" }}
            role={open ? "dialog" : undefined}
            aria-label={open ? "Ask Buddy about Mohamed" : undefined}
          >
            {open && (
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">Ask Buddy</span>
                <button type="button" onClick={() => setOpen(false)} className="rounded px-1.5 text-slate-300 hover:text-white" aria-label="Close">×</button>
              </div>
            )}
            {asked && open && <p className="mb-1.5 text-[12px] text-slate-400">You: {asked}</p>}
            <p className="whitespace-pre-line text-slate-100" aria-live="polite">{typed || caption}</p>
            {open && (
              <>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {CHIPS.map((c) => (
                    <button
                      key={c.q}
                      type="button"
                      onClick={() => ask(c.label, c.q)}
                      className="rounded-full border border-emerald-400/40 px-2.5 py-1 text-[11px] text-emerald-200 transition-colors hover:bg-emerald-400/15"
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
                <form onSubmit={submit} className="mt-3 flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Try: skills, projects, contact"
                    aria-label="Ask a question"
                    className="min-w-0 flex-1 rounded-lg border border-slate-600 bg-slate-900/80 px-2.5 py-1.5 text-[12px] text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                  />
                  <button type="submit" className="rounded-lg bg-emerald-500 px-3 py-1.5 text-[12px] font-semibold text-slate-900 hover:bg-emerald-400">Ask</button>
                </form>
                <p className="mt-2 text-[10px] text-slate-500">Pre-written answers from Mohamed&apos;s CV. No AI model is guessing.</p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal card that melts into the droplet */}
      <motion.div
        ref={drop}
        className="buddy-shell relative overflow-hidden"
        style={{ pointerEvents: "auto", transformOrigin: "bottom left" }}
        initial={false}
        animate={
          isCard
            ? { width: 300, height: 176, borderRadius: 18 }
            : { width: DROP, height: DROP, borderRadius: 999 }
        }
        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 15, mass: 0.9 }}
      >
        {/* glass terminal layer */}
        <motion.div
          className="buddy-glass absolute inset-0"
          animate={{ opacity: isCard ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 0.45, delay: isCard ? 0 : 0.15 }}
        >
          <div className="flex items-center gap-1.5 px-3 pt-2.5">
            <span className="h-2 w-2 rounded-full bg-rose-400/80" />
            <span className="h-2 w-2 rounded-full bg-amber-300/80" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
            <span className="ml-2 text-[10px] text-slate-400">metawea ~ zsh</span>
          </div>
          <div className="px-3.5 pt-3 font-mono text-[11.5px] leading-5 text-slate-200">
            <p style={{ opacity: lines >= 1 ? 1 : 0 }}><span className="text-emerald-300">$</span> npx start @metawea</p>
            <p style={{ opacity: lines >= 2 ? 1 : 0 }}><span className="text-sky-300">&gt;</span> meet buddy<span className="buddy-caret">_</span></p>
          </div>
          <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-2.5 py-1.5 text-[11px] text-slate-200 backdrop-blur" style={{ opacity: lines >= 3 ? 1 : 0.0, transition: "opacity .4s" }}>
            <span className="flex-1">Press <kbd className="rounded bg-black/40 px-1 font-mono">Return</kbd> or</span>
            <button type="button" onClick={melt} className="rounded-lg bg-emerald-400 px-2.5 py-1 font-semibold text-slate-900 hover:bg-emerald-300">Run ↵</button>
          </div>
          <button type="button" onClick={melt} className="absolute right-2.5 top-2 text-[10px] text-slate-400 hover:text-slate-200" aria-label="Skip intro">skip</button>
        </motion.div>

        {/* chrome droplet layer */}
        <motion.button
          type="button"
          onClick={() => { setOpen((o) => { const n = !o; if (n) { if (hideTimer.current) clearTimeout(hideTimer.current); setAsked(null); say("Hi! Pick a topic or type a question. I only know what is on this page and Mohamed's CV."); } else { setCaption(null); } return n; }); }}
          aria-label="Buddy: ask about Mohamed"
          aria-expanded={open}
          className={`buddy-chrome absolute inset-0 ${talking ? "buddy-talk" : ""}`}
          animate={{ opacity: isCard ? 0 : 1, scale: isCard ? 0.6 : 1 }}
          transition={{ duration: reduce ? 0 : 0.5, delay: isCard ? 0 : 0.35 }}
          tabIndex={isCard ? -1 : 0}
        >
          <span className="buddy-gloss" />
          <span ref={eyes} className="buddy-eyes">
            <i className="buddy-eye"><b /></i>
            <i className="buddy-eye"><b /></i>
          </span>
          <span className="buddy-mouth" />
        </motion.button>
      </motion.div>
    </div>
  );
}
