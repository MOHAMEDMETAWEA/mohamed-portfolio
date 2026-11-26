"use client";

import { motion } from "framer-motion";

type Props = {
  lead?: string;
  accent?: string;
  className?: string;
  accentClassName?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

function Words({ text, offset, accentClassName }: { text: string; offset: number; accentClassName?: string }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={`${offset}-${i}`} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em] mr-[0.25em]">
          <motion.span
            className={`inline-block ${accentClassName ?? ""}`}
            variants={{
              hidden: { y: "115%", rotate: 4, opacity: 0 },
              visible: { y: "0%", rotate: 0, opacity: 1, transition: { duration: 0.7, ease, delay: (offset + i) * 0.07 } },
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </>
  );
}

/** Section title where each word slides up from behind a mask when it scrolls into view. */
export function KineticHeading({ lead, accent, className = "", accentClassName }: Props) {
  const leadCount = lead ? lead.split(" ").length : 0;
  return (
    <motion.h2
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      aria-label={[lead, accent].filter(Boolean).join(" ")}
    >
      <span aria-hidden="true">
        {lead && <Words text={lead} offset={0} />}
        {accent && <Words text={accent} offset={leadCount} accentClassName={accentClassName} />}
      </span>
    </motion.h2>
  );
}
