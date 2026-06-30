import { useEffect, useRef } from "react";

export const PALETTES = {
  Google: ["#4285F4", "#EA4335", "#FBBC05", "#34A853"],
  Candy: ["#FF5DA2", "#7C4DFF", "#22C7E8", "#FFC93C"],

  MonoBlue: ["#E8F1FF", "#86B8FF", "#4285F4", "#1A73E8"],
  MonoRed: ["#FDECEC", "#F28B82", "#EA4335", "#C5221F"],
  MonoGreen: ["#E6F4EA", "#81C995", "#34A853", "#188038"],
} as const;

export type Palette = keyof typeof PALETTES;

interface MagneticDotsProps {
  /** Color set used for the bloom around the cursor. */
  palette?: Palette;
  /** Multiplier on how far dots are pushed (0.4 = calm, 2 = wild). */
  intensity?: number;
  className?: string;
  background?: string;
}

/**
 * A quiet grid of dots that parts and lights up around the pointer.
 * Pure <canvas> + requestAnimationFrame — no per-dot React nodes.
 * Fills its parent element, so give the parent `position: relative`.
 */
export function MagneticDots({
  palette = "Google",
  intensity = 1,
  className,
  background = "#ffffff",
}: MagneticDotsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const wrap = canvas.parentElement;
    if (!wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = PALETTES[palette] ?? PALETTES.Google;

    const st = {
      mx: 0,
      my: 0,
      tx: 0,
      ty: 0,
      hover: false,
      t: Math.random() * 10,
      raf: 0,
      cssW: 0,
      cssH: 0,
      dpr: 1,
    };

    // const resize = () => {
    //   const b = wrap.getBoundingClientRect();
    //   st.cssW = b.width;
    //   st.cssH = b.height;
    //   st.dpr = Math.min(window.devicePixelRatio || 1, 2);
    //   canvas.width = Math.max(1, Math.round(st.cssW * st.dpr));
    //   canvas.height = Math.max(1, Math.round(st.cssH * st.dpr));
    //   if (st.mx === 0 && st.my === 0) {
    //     st.mx = st.tx = st.cssW * 0.5;
    //     st.my = st.ty = st.cssH * 0.44;
    //   }
    // };
    const resize = () => {
      const b = wrap.getBoundingClientRect();
      const newCssW = b.width;
      const newCssH = b.height;

      // Skip if size hasn't meaningfully changed — avoids clearing canvas on sub-pixel/animation-frame churn
      if (
        Math.abs(newCssW - st.cssW) < 1 &&
        Math.abs(newCssH - st.cssH) < 1 &&
        st.cssW !== 0
      ) {
        return;
      }

      st.cssW = newCssW;
      st.cssH = newCssH;
      st.dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(st.cssW * st.dpr));
      canvas.height = Math.max(1, Math.round(st.cssH * st.dpr));
      if (st.mx === 0 && st.my === 0) {
        st.mx = st.tx = st.cssW * 0.5;
        st.my = st.ty = st.cssH * 0.44;
      }
    };
    resize();

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      st.tx = ((e.clientX - r.left) / r.width) * st.cssW;
      st.ty = ((e.clientY - r.top) / r.height) * st.cssH;
      st.hover = true;
    };
    const onLeave = () => {
      st.hover = false;
    };

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    // const ro = new ResizeObserver(resize);
    // ro.observe(wrap);
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 100);
    });
    ro.observe(wrap);

    const sp = 34; // grid spacing
    const R = 160; // bloom radius

    const loop = () => {
      st.t += 0.016;

      // Idle drift when the pointer isn't over the canvas.
      if (!st.hover) {
        st.tx = st.cssW * 0.5 + Math.cos(st.t * 0.45) * st.cssW * 0.18;
        st.ty = st.cssH * 0.46 + Math.sin(st.t * 0.7) * st.cssH * 0.15;
      }
      st.mx += (st.tx - st.mx) * 0.07;
      st.my += (st.ty - st.my) * 0.07;

      ctx.setTransform(st.dpr, 0, 0, st.dpr, 0, 0);
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, st.cssW, st.cssH);

      for (let gx = sp / 2; gx < st.cssW; gx += sp) {
        for (let gy = sp / 2; gy < st.cssH; gy += sp) {
          const wy = Math.sin(gx * 0.012 + gy * 0.012 + st.t) * 1.8;
          const px = gx;
          const py = gy + wy;
          const dx = px - st.mx;
          const dy = py - st.my;
          const d = Math.hypot(dx, dy) + 0.001;

          let ox = 0;
          let oy = 0;
          let size = 1.7;
          // let col = "#D1D5DB";
          let col = "#D8DCE2";
          let a = 0.5;

          if (d < R) {
            const u = 1 - d / R;
            const off = u * 26 * intensity;
            ox = (dx / d) * off;
            oy = (dy / d) * off;
            size = 1.7 + u * u * 4;
            const ci =
              Math.floor(
                ((Math.atan2(dy, dx) + Math.PI) / (Math.PI * 2)) *
                  colors.length,
              ) % colors.length;
            col = colors[ci];
            a = 0.32 + u * 0.55;
          }

          ctx.globalAlpha = a;
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.arc(px + ox, py + oy, size, 0, 7);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      st.raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(st.raf);
    };
  }, [palette, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className ?? ""}`}
      aria-hidden="true"
    />
  );
}
