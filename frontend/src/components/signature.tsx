import { useEffect, useId, useState } from "react";
import { motion } from "motion/react";
import { parse as parseFont } from "opentype.js";

type SignatureGlyph = {
  advanceWidth?: number;
  getPath: (
    x: number,
    y: number,
    fontSize: number,
  ) => {
    toPathData: (decimalPlaces?: number) => string;
  };
};

type SignatureFont = {
  unitsPerEm: number;
  ascender: number;
  descender: number;
  charToGlyph: (char: string) => SignatureGlyph;
};

const PATH_DELAY_STEP = 0.2;
const OPACITY_DELAY_OFFSET = 0.01;
const fontCache = new Map<string, SignatureFont>();

function getFontCacheKey(path: string): string {
  try {
    return new URL(path, window.location.origin).href;
  } catch {
    return path;
  }
}

function getPathTransition(index: number, duration: number, delay: number) {
  const pathDelay = delay + index * PATH_DELAY_STEP;

  return {
    pathLength: {
      delay: pathDelay,
      duration,
      ease: "easeInOut" as const,
    },
    opacity: {
      delay: pathDelay + OPACITY_DELAY_OFFSET,
      duration: 0.01,
    },
  };
}

async function loadFontFromPaths(fontPaths: string[]): Promise<SignatureFont> {
  for (const path of fontPaths) {
    try {
      const cacheKey = getFontCacheKey(path);
      const cachedFont = fontCache.get(cacheKey);

      if (cachedFont) {
        return cachedFont;
      }

      const response = await fetch(path);

      if (!response.ok) {
        continue;
      }

      const fontBuffer = await response.arrayBuffer();
      const font = parseFont(fontBuffer) as SignatureFont;
      fontCache.set(cacheKey, font);

      return font;
    } catch {
      // Try next path
    }
  }

  throw new Error(
    `Font could not be loaded from the provided path${fontPaths.length === 1 ? "" : "s"}: ${fontPaths.join(", ")}`,
  );
}

async function buildSignaturePaths({
  text,
  fontSize,
  horizontalPadding,
}: {
  text: string;
  fontSize: number;
  horizontalPadding: number;
}): Promise<{
  paths: string[];
  width: number;
  height: number;
}> {
  const font = await loadFontFromPaths(["/LastoriaBoldRegular.otf"]);

  const scale = fontSize / font.unitsPerEm;

  const ascent = font.ascender * scale;
  const descent = Math.abs(font.descender) * scale;

  const verticalPadding = 2;

  const baseline = verticalPadding + ascent;
  const height = ascent + descent + verticalPadding * 2;

  let x = horizontalPadding;
  const nextPaths: string[] = [];

  for (const char of text) {
    const glyph = font.charToGlyph(char);

    const path = glyph.getPath(x, baseline, fontSize);

    nextPaths.push(path.toPathData(3));

    const advanceWidth = glyph.advanceWidth ?? font.unitsPerEm;
    x += advanceWidth * scale;
  }

  return {
    paths: nextPaths,
    width: x + horizontalPadding,
    height,
  };
}

function renderMotionPaths({
  paths,
  stroke,
  strokeWidth,
  strokeLinecap,
  strokeLinejoin,
  duration,
  delay,
}: {
  paths: string[];
  stroke: string;
  strokeWidth: number;
  strokeLinecap: "round" | "butt";
  strokeLinejoin: "round";
  duration: number;
  delay: number;
}) {
  return paths.map((d, index) => (
    <motion.path
      key={index}
      d={d}
      stroke={stroke}
      strokeWidth={strokeWidth}
      fill="none"
      variants={PATH_VARIANTS}
      transition={getPathTransition(index, duration, delay)}
      vectorEffect="non-scaling-stroke"
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
    />
  ));
}

const PATH_VARIANTS = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1 },
};

interface SignatureProps {
  text?: string;
  color?: string;
  fontSize?: number;
  duration?: number;
  delay?: number;
  className?: string;
  inView?: boolean;
  once?: boolean;
}

export function Signature({
  text = "Signature",
  color = "#000",
  fontSize = 14,
  duration = 1.5,
  delay = 0,
  className,
  inView = false,
  once = true,
}: SignatureProps) {
  const [paths, setPaths] = useState<string[]>([]);
  const [width, setWidth] = useState<number>(300);
  const [height, setHeight] = useState<number>(40);
  const horizontalPadding = fontSize * 0.1;
  const maskId = `signature-reveal-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    let isCancelled = false;

    async function loadSignaturePaths() {
      try {
        const {
          paths: nextPaths,
          width: nextWidth,
          height: nextHeight,
        } = await buildSignaturePaths({
          text,
          fontSize,
          horizontalPadding,
        });

        if (isCancelled) {
          return;
        }

        setPaths(nextPaths);
        setWidth(nextWidth);
        setHeight(nextHeight);
      } catch {
        if (isCancelled) {
          return;
        }

        setPaths([]);
        setWidth(text.length * fontSize * 0.6);
      }
    }

    void loadSignaturePaths();

    return () => {
      isCancelled = true;
    };
  }, [text, fontSize, horizontalPadding]);

  return (
    <motion.svg
      key={paths.length}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      style={{
        display: "block",
        overflow: "visible",
      }}
      className={className}
      initial="hidden"
      whileInView={inView ? "visible" : undefined}
      animate={inView ? undefined : "visible"}
      viewport={{ once }}
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          {renderMotionPaths({
            paths,
            stroke: "white",
            strokeWidth: fontSize * 0.22,
            strokeLinecap: "round",
            strokeLinejoin: "round",
            duration,
            delay,
          })}
        </mask>
      </defs>

      {renderMotionPaths({
        paths,
        stroke: color,
        strokeWidth: 2,
        strokeLinecap: "butt",
        strokeLinejoin: "round",
        duration,
        delay,
      })}

      <g mask={`url(#${maskId})`}>
        {paths.map((d, index) => (
          <path key={index} d={d} fill={color} />
        ))}
      </g>
    </motion.svg>
  );
}
