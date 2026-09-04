"use client";

import { useEffect, useRef } from "react";
import { usePulseStore } from "@/app/lib/use-pulse-store";

type NodeState = "signal" | "at-risk" | "recovered" | "critical";

interface CanvasNode {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  state: NodeState;
  region: number;
  baseRadius: number;
  phase: number;
}

interface TransactionPulse {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  state: NodeState;
}

interface BloomRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: string;
  alpha: number;
}

// Monochrome Black & White Color Mapping
const STATE_COLOR: Record<NodeState, string> = {
  signal: "#ffffff",
  "at-risk": "#d4d4d8",
  recovered: "#ffffff",
  critical: "#a1a1aa"
};

export function PulseField({
  className,
  interactive = true,
  nodeDensity = 68
}: {
  className?: string;
  interactive?: boolean;
  nodeDensity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { nodeStates, totalRecoveredToday } = usePulseStore();
  const nodeStatesRef = useRef(nodeStates);
  const mousePosRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });
  const ripplesRef = useRef<BloomRipple[]>([]);
  const prevRecoveredRef = useRef(totalRecoveredToday);

  useEffect(() => {
    nodeStatesRef.current = nodeStates;
  }, [nodeStates]);

  // Trigger monochrome bloom ripple when recovery occurs
  useEffect(() => {
    if (totalRecoveredToday > prevRecoveredRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      ripplesRef.current.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 12,
        maxRadius: Math.max(canvas.width, canvas.height) * 0.75,
        color: "#ffffff",
        alpha: 0.7
      });
      prevRecoveredRef.current = totalRecoveredToday;
    }
  }, [totalRecoveredToday]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        x: (e.clientX - rect.left) * window.devicePixelRatio,
        y: (e.clientY - rect.top) * window.devicePixelRatio,
        active: true
      };
    };

    const handleMouseLeave = () => {
      mousePosRef.current.active = false;
    };

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    const NODE_COUNT = Math.max(28, Math.min(46, nodeDensity));
    const nodes: CanvasNode[] = Array.from({ length: NODE_COUNT }, (_, i) => {
      const region = i % 4;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      return {
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        state: "signal",
        region,
        baseRadius: (Math.random() * 1.5 + 2.0) * window.devicePixelRatio,
        phase: Math.random() * Math.PI * 2
      };
    });

    const transactionPulses: TransactionPulse[] = [];
    const MAX_PULSES = 18;

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (!wasVisible && isVisible && !reduceMotion) {
          startTime = performance.now();
          raf = requestAnimationFrame(frame);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    let raf: number;
    let startTime = performance.now();

    function frame(now: number) {
      if (!canvas || !ctx || !isVisible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const elapsed = (now - startTime) / 1000;
      const heartbeat = Math.sin(elapsed * 4.5) * 0.5 + 0.5; // 0 to 1

      const LINK_DIST = canvas.width * 0.16;
      const mouse = mousePosRef.current;

      // 1. Draw Expanding Monochrome Bloom Ripples
      for (let r = ripplesRef.current.length - 1; r >= 0; r--) {
        const ripple = ripplesRef.current[r];
        ripple.radius += 5.0 * window.devicePixelRatio;
        ripple.alpha *= 0.95;

        // Double stroke without software blur for 60fps performance
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.alpha * 0.15})`;
        ctx.lineWidth = 5.0 * window.devicePixelRatio;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.alpha * 0.6})`;
        ctx.lineWidth = 1.5 * window.devicePixelRatio;
        ctx.stroke();

        if (ripple.alpha < 0.01 || ripple.radius > ripple.maxRadius) {
          ripplesRef.current.splice(r, 1);
        }
      }

      // 2. Update node positions & state
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        if (!reduceMotion) {
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
          if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

          if (mouse.active) {
            const dx = n.x - mouse.x;
            const dy = n.y - mouse.y;
            const dist = Math.hypot(dx, dy);
            const maxMouseDist = 140 * window.devicePixelRatio;

            if (dist < maxMouseDist && dist > 1) {
              const force = (1 - dist / maxMouseDist) * 1.5;
              n.x += (dx / dist) * force;
              n.y += (dy / dist) * force;
            }
          }
        }

        const activeRegionalState = nodeStatesRef.current[n.region];
        n.state = activeRegionalState ?? "signal";
      }

      // 3. Faint Translucent White Vectors (Glassmorphism links)
      const validLinks: [number, number, number][] = [];

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);

          if (d < LINK_DIST) {
            validLinks.push([i, j, d]);
            const distRatio = 1 - d / LINK_DIST;
            const alpha = (0.05 + heartbeat * 0.07) * distRatio;
            
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = (0.75 + distRatio * 0.75) * window.devicePixelRatio;
            ctx.stroke();
          }
        }
      }

      // 4. Live Transaction Light Packets
      if (!reduceMotion && validLinks.length > 0 && Math.random() < 0.20 && transactionPulses.length < MAX_PULSES) {
        const randomLink = validLinks[Math.floor(Math.random() * validLinks.length)];
        transactionPulses.push({
          fromNode: randomLink[0],
          toNode: randomLink[1],
          progress: 0,
          speed: Math.random() * 0.018 + 0.012,
          state: nodes[randomLink[0]].state
        });
      }

      for (let p = transactionPulses.length - 1; p >= 0; p--) {
        const pulse = transactionPulses[p];
        pulse.progress += pulse.speed;

        const nodeA = nodes[pulse.fromNode];
        const nodeB = nodes[pulse.toNode];

        if (nodeA && nodeB) {
          const px = nodeA.x + (nodeB.x - nodeA.x) * pulse.progress;
          const py = nodeA.y + (nodeB.y - nodeA.y) * pulse.progress;

          // Multi-arc glowing pulse without expensive software blur
          ctx.beginPath();
          ctx.arc(px, py, 4.0 * window.devicePixelRatio, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
          ctx.fill();

          ctx.beginPath();
          ctx.arc(px, py, 2.0 * window.devicePixelRatio, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff";
          ctx.fill();

          // Trailing comet stream
          const trailLength = 0.18;
          const tx = nodeA.x + (nodeB.x - nodeA.x) * Math.max(0, pulse.progress - trailLength);
          const ty = nodeA.y + (nodeB.y - nodeA.y) * Math.max(0, pulse.progress - trailLength);
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(tx, ty);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
          ctx.lineWidth = 1.8 * window.devicePixelRatio;
          ctx.stroke();
        }

        if (pulse.progress >= 1) {
          transactionPulses.splice(p, 1);
        }
      }

      // 5. Draw Glowing Monochrome Nodes with Layered Halo (Locked 60 FPS)
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const color = STATE_COLOR[n.state];
        
        const nodePulse = Math.sin(elapsed * 3 + n.phase) * 0.35 + 0.65;
        const currentRadius = n.baseRadius * (0.85 + heartbeat * 0.25 + nodePulse * 0.15);

        // Outer soft halo
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius * (2.4 + heartbeat * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
        ctx.fill();

        // Inner radiant halo
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.20)";
        ctx.fill();

        // Core solid node
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      }

      if (!reduceMotion && isVisible) {
        raf = requestAnimationFrame(frame);
      }
    }

    raf = requestAnimationFrame(frame);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(raf);
    };
  }, [interactive, nodeDensity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? "opacity-80"}`}
    />
  );
}
