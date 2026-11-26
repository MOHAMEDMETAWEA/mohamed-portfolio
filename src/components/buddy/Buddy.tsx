"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CLIPS_A } from "./clips-va";
import { CLIPS_B } from "./clips-vb";
import { CLIPS_C } from "./clips-vc";
import { HI_CLIP } from "./clips-hi";

const CLIPS: Record<string, string> = { ...CLIPS_A, ...CLIPS_B, ...CLIPS_C };

type Props = {
  /** Pre-written answers, used for the chips and as the fallback when the AI is unavailable. */
  answer: (question: string) => string;
};

const SECTION_LINES: Record<string, string> = {
  hero: "Oh! Hi! I'm Hamo. I'll show you around Mohamed's portfolio.",
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
const HAMO_API = "https://hamo-api.mohamedmostafametawea.workers.dev";

export function Buddy({ answer }: Props) {
  const offline = (q: string) => {
    const t = q.toLowerCase();
    const map: [RegExp, string][] = [
      [/medagent|triage/, "medagent"], [/skill|python|tensorflow|langchain|stack|technolog|tools/, "skills"],
      [/project|built|build|portfolio/, "projects"], [/experience|intern|cellula|work|job|employ/, "experience"],
      [/educat|degree|universit|study|gpa|graduat/, "education"], [/certif|course|coursera|ibm|training/, "certifications"],
      [/contact|email|phone|reach|hire|linkedin|github/, "contact"],
    ];
    for (const [re, k] of map) if (re.test(t)) return answer(k);
    return "I can't reach my AI brain right now, and I have no pre-written answer for that. Please contact Mohamed directly using the links in the Contact section.";
  };
  const [thinking, setThinking] = useState(false);
  const [booted, setBooted] = useState(false);
  const [reduce, setReduce] = useState(false);
  const [open, setOpen] = useState(false);
  const [caption, setCaption] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [asked, setAsked] = useState<string | null>(null);
  const [talking, setTalking] = useState(false);
  const [input, setInput] = useState("");
  const [spokenKey, setSpokenKey] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stopAudio = () => {
    const a = audioRef.current;
    if (a) { a.pause(); a.currentTime = 0; }
    setPlaying(false);
  };
  // Tap-to-play only: nothing ever plays by itself.
  const playKey = (key: string) => {
    if (!CLIPS[key]) return;
    if (playing) { stopAudio(); return; }
    const a = audioRef.current ?? new Audio();
    audioRef.current = a;
    a.src = CLIPS[key];
    a.onended = () => { setPlaying(false); setIntroPlaying(false); };
    a.onerror = () => { setPlaying(false); setIntroPlaying(false); };
    a.play().then(() => setPlaying(true)).catch(() => { setPlaying(false); setIntroPlaying(false); });
  };
  const listen = () => { if (spokenKey) playKey(spokenKey); };

  // First-visit welcome card: asks before playing anything.
  const [welcome, setWelcome] = useState(false);
  const [introPlaying, setIntroPlaying] = useState(false);
  useEffect(() => {
    try { if (!localStorage.getItem("hamo-intro-seen")) setWelcome(true); } catch { /* ignore */ }
  }, []);
  const closeWelcome = () => {
    try { localStorage.setItem("hamo-intro-seen", "1"); } catch { /* ignore */ }
    stopAudio();
    setIntroPlaying(false);
    setWelcome(false);
  };
  const playIntro = () => {
    try { localStorage.setItem("hamo-intro-seen", "1"); } catch { /* ignore */ }
    setIntroPlaying(true);
    playKey("intro");
  };

  // Stop any voice when the tab goes to the background.
  useEffect(() => {
    const h = () => { if (document.hidden) { const a = audioRef.current; if (a) { a.pause(); a.currentTime = 0; } setPlaying(false); setIntroPlaying(false); } };
    document.addEventListener("visibilitychange", h);
    return () => document.removeEventListener("visibilitychange", h);
  }, []);

  const drop = useRef<HTMLDivElement>(null);
  const eyes = useRef<HTMLDivElement>(null);
  const lastSection = useRef<string>("");
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typeTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Boot: the droplet is always there, and it greets by itself on every load.
  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setBooted(true);
  }, []);

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

  // Droplet landing: caption "Hi, I'm Hamo" with the splash, voice on first gesture (autoplay is tried first).
  useEffect(() => {
    if (!booted) return;
    const t = setTimeout(() => { if (!openRef.current) { const h = say("Hi, I'm Hamo", 3000); hideLater(h > 3000 ? 3000 : h); } }, reduce ? 300 : 1250);
    let done = false;
    try { if (sessionStorage.getItem("hamo-hi")) done = true; } catch { /* ignore */ }
    let armed = false;
    const events = ["pointerdown", "keydown", "touchend", "click"] as const;
    const disarm = () => { events.forEach((e) => window.removeEventListener(e, onGesture, true)); armed = false; };
    const playHi = () => {
      if (done) return Promise.resolve();
      const a = new Audio(HI_CLIP);
      return a.play().then(() => { done = true; try { sessionStorage.setItem("hamo-hi", "1"); } catch { /* ignore */ } });
    };
    function onGesture(ev: Event) {
      const tgt = ev.target as Element | null;
      if (tgt && tgt.closest && tgt.closest(".buddy-root")) { disarm(); return; }
      disarm();
      playHi().catch(() => { /* ignore */ });
    }
    const start = setTimeout(() => {
      if (done) return;
      playHi().catch(() => {
        if (done) return;
        armed = true;
        events.forEach((e) => window.addEventListener(e, onGesture, true));
      });
    }, reduce ? 300 : 900);
    const giveUp = setTimeout(() => { if (armed) disarm(); }, 20000);
    return () => { clearTimeout(t); clearTimeout(start); clearTimeout(giveUp); if (armed) disarm(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booted, reduce]);

  // Greeting starts on its own shortly after load, no click needed.
  useEffect(() => {
    if (!booted) return;
    const t = setTimeout(() => {
      if (openRef.current) return;
      try { if (!localStorage.getItem("hamo-intro-seen")) return; } catch { /* ignore */ }
      const hold = say(SECTION_LINES.hero);
      hideLater(hold + 2500);
    }, 700);
    return () => clearTimeout(t);
  }, [booted, say, hideLater]);

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
      d.style.setProperty("--ry", `${(dx / dist) * 14 * k}deg`);
      d.style.setProperty("--rx", `${-(dy / dist) * 12 * k}deg`);
      d.style.setProperty("--gx", `${(dx / dist) * 3 * k}px`);
      d.style.setProperty("--gy", `${(dy / dist) * 3 * k}px`);
      lastLook = Date.now();
    };
    let lastLook = 0;
    // Idle glances when nobody is moving a pointer.
    const idle = setInterval(() => {
      if (Date.now() - lastLook < 4000 || document.hidden) return;
      const a = Math.random() * Math.PI * 2;
      const d = drop.current;
      const r = d ? d.getBoundingClientRect() : null;
      if (!r) return;
      const cx = r.left + r.width / 2 + Math.cos(a) * 160;
      const cy = r.top + r.height / 2 + Math.sin(a) * 120;
      look(cx, cy);
      lastLook = 0;
    }, 3200);
    const m = (ev: MouseEvent) => look(ev.clientX, ev.clientY);
    const t = (ev: TouchEvent) => ev.touches[0] && look(ev.touches[0].clientX, ev.touches[0].clientY);
    window.addEventListener("mousemove", m);
    window.addEventListener("touchmove", t, { passive: true });
    return () => { clearInterval(idle); window.removeEventListener("mousemove", m); window.removeEventListener("touchmove", t); };
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
          if (!openRef.current && best !== "hero") {
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
    stopAudio();
    setSpokenKey(q);
    setAsked(label);
    say(answer(q));
    if (hideTimer.current) clearTimeout(hideTimer.current);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim().slice(0, 300);
    if (!q || thinking) return;
    setInput("");
    stopAudio();
    setSpokenKey(null);
    setAsked(q);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setThinking(true);
    setTyped("…");
    let a: string | null = null;
    try {
      const ctl = new AbortController();
      const to = setTimeout(() => ctl.abort(), 12000);
      const r = await fetch(HAMO_API, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ q }), signal: ctl.signal });
      clearTimeout(to);
      const d = await r.json();
      if (d && typeof d.answer === "string" && d.answer.trim()) a = d.answer.trim();
    } catch {}
    setThinking(false);
    say(a ?? offline(q));
  };

  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  useEffect(() => () => {
    if (typeTimer.current) clearInterval(typeTimer.current);
    if (hideTimer.current) clearTimeout(hideTimer.current);
  }, []);

  if (!booted) return null;

  return (
    <div className="buddy-root fixed bottom-4 left-4 z-[60] sm:bottom-6 sm:left-6" style={{ pointerEvents: "none" }}>
      {welcome && !open && !caption && (
        <div className="buddy-bubble mb-3 w-[min(21rem,calc(100vw-2rem))] rounded-2xl p-3.5 text-[13px] leading-relaxed" style={{ pointerEvents: "auto" }} role="region" aria-label="Meet Hamo">
          <div className="mb-1.5 flex items-start justify-between gap-2">
            <p className="font-semibold text-slate-100">Meet Hamo | حمو</p>
            <button type="button" onClick={closeWelcome} className="rounded px-1.5 text-slate-300 hover:text-white" aria-label="Dismiss">×</button>
          </div>
          <p className="text-slate-200">Tap to hear Hamo introduce himself. It is a short clip, and it only plays if you tap.</p>
          <div className="mt-2.5 flex gap-2">
            <button type="button" onClick={introPlaying ? closeWelcome : playIntro} className="rounded-lg bg-emerald-500 px-3 py-1.5 text-[12px] font-semibold text-slate-900 hover:bg-emerald-400">{introPlaying ? "■ Stop" : "▶ Hear intro"}</button>
            <button type="button" onClick={closeWelcome} className="rounded-lg border border-slate-600 px-3 py-1.5 text-[12px] text-slate-200 hover:bg-slate-700/50">No thanks</button>
          </div>
        </div>
      )}
      {/* Speech bubble / Q&A panel */}
      <AnimatePresence>
        {(open || caption) && (
          <motion.div
            key={open ? "panel" : "bubble"}
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="buddy-bubble mb-3 w-[min(21rem,calc(100vw-2rem))] rounded-2xl p-3.5 text-[13px] leading-relaxed"
            style={{ pointerEvents: "auto", transformOrigin: "bottom left" }}
            role={open ? "dialog" : undefined}
            aria-label={open ? "Ask Hamo about Mohamed" : undefined}
          >
            {open && (
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-300">Ask Hamo | حمو</span>
                <div className="flex items-center gap-1">
                  {spokenKey && CLIPS[spokenKey] && (
                    <button type="button" onClick={listen} className="rounded-full border border-emerald-400/40 px-2 py-0.5 text-[11px] text-emerald-200 hover:bg-emerald-400/15" aria-label={playing ? "Stop voice" : "Listen to this answer"}>{playing ? "■ Stop" : "▶ Listen"}</button>
                  )}
                  <button type="button" onClick={() => { stopAudio(); setOpen(false); }} className="rounded px-1.5 text-slate-300 hover:text-white" aria-label="Close">×</button>
                </div>
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
                    placeholder="Ask me anything about Mohamed"
                    aria-label="Ask a question"
                    className="min-w-0 flex-1 rounded-lg border border-slate-600 bg-slate-900/80 px-2.5 py-1.5 text-[12px] text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                  />
                  <button type="submit" className="rounded-lg bg-emerald-500 px-3 py-1.5 text-[12px] font-semibold text-slate-900 hover:bg-emerald-400">Ask</button>
                </form>
                <p className="mt-2 text-[10px] text-slate-500">Hamo answers only from Mohamed&apos;s CV and portfolio. If it does not know, it says so.</p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chrome droplet */}
      <div className={reduce ? "buddy-fall-wrap" : "buddy-fall-wrap buddy-fall"} style={{ position: "relative", width: DROP, height: DROP }}>
      <span className="buddy-ripple" aria-hidden="true" />
      <span className="buddy-ripple buddy-ripple2" aria-hidden="true" />
      <motion.div
        ref={drop}
        className="buddy-shell relative overflow-hidden"
        style={{ pointerEvents: "auto", transformOrigin: "bottom left" }}
        initial={false}
        animate={{ width: DROP, height: DROP, borderRadius: 999 }}
        transition={{ duration: 0 }}
      >
        {/* chrome droplet layer */}
        <motion.button
          type="button"
          onClick={() => { setOpen((o) => { const n = !o; if (n) { if (hideTimer.current) clearTimeout(hideTimer.current); setAsked(null); say("Hi! Pick a topic or type a question. I only know what is on this page and Mohamed's CV."); } else { setCaption(null); } return n; }); }}
          aria-label="Hamo: ask about Mohamed"
          aria-expanded={open}
          className={`buddy-chrome absolute inset-0 ${talking ? "buddy-talk" : ""}`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduce ? 0 : 0.4 }}
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
    </div>
  );
}
