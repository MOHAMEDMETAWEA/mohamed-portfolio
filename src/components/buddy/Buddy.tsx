"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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

function cleanForSpeech(t: string) {
  return t
    .replace(/https?:\/\/\S+/g, "the link on this page")
    .replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, "the email on this page")
    .replace(/\bGPA 3\.44\/4\.0/g, "GPA 3.44 out of 4")
    .replace(/\s*\n+\s*/g, ". ");
}

function pickVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const vs = window.speechSynthesis.getVoices().filter((v) => /^en([-_]|$)/i.test(v.lang));
  if (!vs.length) return null;
  const prefs = [/natural|online/i, /google us english/i, /samantha|ava|allison|zoe|karen|daniel/i, /en[-_]us/i];
  for (const re of prefs) {
    const v = vs.find((x) => re.test(x.name) || re.test(x.lang));
    if (v) return v;
  }
  return vs[0];
}

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
  const [speaking, setSpeaking] = useState(false);
  const [muted, setMuted] = useState(false);
  const [canSpeak, setCanSpeak] = useState(false);
  const mutedRef = useRef(false);
  const pendingSpeech = useRef<string | null>(null);
  const currentText = useRef<string | null>(null);
  const [input, setInput] = useState("");

  const drop = useRef<HTMLDivElement>(null);
  const eyes = useRef<HTMLDivElement>(null);
  const lastSection = useRef<string>("");
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typeTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Boot: the droplet is always there, and it greets by itself on every load.
  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const ok = "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
    setCanSpeak(ok);
    let m = false;
    try { m = localStorage.getItem("buddy-muted") === "1"; } catch {}
    setMuted(m);
    mutedRef.current = m;
    if (ok) { window.speechSynthesis.getVoices(); }
    setBooted(true);
  }, []);

  const speak = useCallback((text: string) => {
    currentText.current = text;
    if (typeof window === "undefined" || !("speechSynthesis" in window) || mutedRef.current) return;
    try {
      const ss = window.speechSynthesis;
      ss.cancel();
      const u = new SpeechSynthesisUtterance(cleanForSpeech(text));
      const v = pickVoice();
      if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = "en-US"; }
      u.rate = 1.03;
      u.pitch = 1.12;
      u.onstart = () => { pendingSpeech.current = null; setSpeaking(true); };
      u.onend = () => setSpeaking(false);
      u.onerror = (e) => {
        setSpeaking(false);
        // Blocked until the visitor interacts with the page: remember it and say it on the first gesture.
        if ((e as SpeechSynthesisErrorEvent).error === "not-allowed") pendingSpeech.current = text;
      };
      ss.speak(u);
      // Some engines drop the error event when blocked: keep it pending until speech actually starts.
      pendingSpeech.current = text;
    } catch {}
  }, []);

  const say = useCallback((text: string, hold = 6500) => {
    if (typeTimer.current) clearInterval(typeTimer.current);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setCaption(text);
    setTyped("");
    setTalking(true);
    speak(text);
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
  }, [reduce, speak]);

  const hideLater = useCallback((ms: number) => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setCaption(null), ms);
  }, []);

  // Greeting starts on its own shortly after load, no click needed.
  useEffect(() => {
    if (!booted) return;
    const t = setTimeout(() => {
      if (openRef.current) return;
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

  // Browsers only allow speech after a real gesture (click, tap or key press; scroll and mouse move do not count).
  // The first one speaks whatever Buddy is currently saying, without any visible prompt.
  useEffect(() => {
    if (!booted || !canSpeak) return;
    const go = () => {
      const t = pendingSpeech.current;
      if (t && !mutedRef.current && currentText.current === t) speak(t);
      pendingSpeech.current = null;
      ["pointerdown", "keydown", "touchend", "click"].forEach((n) => window.removeEventListener(n, go));
    };
    ["pointerdown", "keydown", "touchend", "click"].forEach((n) => window.addEventListener(n, go, { passive: true }));
    const vc = () => { /* voices loaded */ };
    window.speechSynthesis.addEventListener?.("voiceschanged", vc);
    return () => {
      ["pointerdown", "keydown", "touchend", "click"].forEach((n) => window.removeEventListener(n, go));
      window.speechSynthesis.removeEventListener?.("voiceschanged", vc);
    };
  }, [booted, canSpeak, speak]);

  const toggleMute = () => {
    const m = !mutedRef.current;
    mutedRef.current = m;
    setMuted(m);
    try { localStorage.setItem("buddy-muted", m ? "1" : "0"); } catch {}
    if (m) { try { window.speechSynthesis.cancel(); } catch {} setSpeaking(false); }
    else if (currentText.current && caption) speak(currentText.current);
  };

  const openRef = useRef(open);
  openRef.current = open;

  const ask = (label: string, q: string) => {
    setAsked(label);
    say(answer(q));
    if (hideTimer.current) clearTimeout(hideTimer.current);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim().slice(0, 300);
    if (!q || thinking) return;
    setInput("");
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
    try { window.speechSynthesis?.cancel(); } catch {}
  }, []);

  if (!booted) return null;

  return (
    <div className="buddy-root fixed bottom-4 left-4 z-[60] sm:bottom-6 sm:left-6" style={{ pointerEvents: "none" }}>
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
          className={`buddy-chrome absolute inset-0 ${talking || speaking ? "buddy-talk" : ""}`}
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

      {canSpeak && (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute Hamo" : "Mute Hamo"}
          aria-pressed={muted}
          title={muted ? "Unmute Hamo" : "Mute Hamo"}
          className="buddy-mute"
          style={{ pointerEvents: "auto" }}
        >
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor" stroke="none" />
            {muted ? (<><path d="m17 9 5 6" /><path d="m22 9-5 6" /></>) : (<><path d="M15.5 8.5a5 5 0 0 1 0 7" /><path d="M18.5 5.5a9 9 0 0 1 0 13" /></>)}
          </svg>
        </button>
      )}
    </div>
  );
}
