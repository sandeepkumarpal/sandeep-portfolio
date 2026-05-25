"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CountUpProps {
  end: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

export function CountUp({
  end,
  suffix = "",
  className,
  duration = 2000,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(1);
  const hasFinished = useRef(false);

  useEffect(() => {
    if (!isInView || hasFinished.current) return;

    if (end <= 1) {
      setCount(end);
      hasFinished.current = true;
      return;
    }

    const steps = end - 1;
    const stepMs = Math.max(16, duration / steps);
    let current = 1;

    const id = window.setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= end) {
        window.clearInterval(id);
        hasFinished.current = true;
      }
    }, stepMs);

    return () => window.clearInterval(id);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {count}
      {suffix}
    </span>
  );
}
