"use client";

import { motion, useSpring, useTransform } from "motion/react";
import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface FunnelGradientStop {
  offset: string | number;
  color: string;
}

export interface FunnelStage {
  label: string;
  value: number;
  displayValue?: string;
  color?: string;
  gradient?: FunnelGradientStop[];
}

export interface FunnelChartProps {
  data: FunnelStage[];
  orientation?: "horizontal" | "vertical";
  color?: string;
  layers?: number;
  className?: string;
  style?: CSSProperties;
  showPercentage?: boolean;
  showValues?: boolean;
  showLabels?: boolean;
  hoveredIndex?: number | null;
  onHoverChange?: (index: number | null) => void;
  formatPercentage?: (pct: number) => string;
  formatValue?: (value: number) => string;
  staggerDelay?: number;
  gap?: number;
  renderPattern?: (id: string, color: string) => ReactNode;
  edges?: "curved" | "straight";
  labelLayout?: "spread" | "grouped";
  labelOrientation?: "vertical" | "horizontal";
  labelAlign?: "center" | "start" | "end";
  grid?:
    | boolean
    | {
        bands?: boolean;
        bandColor?: string;
        lines?: boolean;
        lineColor?: string;
        lineOpacity?: number;
        lineWidth?: number;
      };
}

// ─── Defaults ────────────────────────────────────────────────────────────────

const fmtPct = (p: number) => `${Math.round(p)}%`;
const fmtVal = (v: number) => v.toLocaleString("en-US");

const springConfig = { stiffness: 120, damping: 20, mass: 1 };
const hoverSpring = { stiffness: 300, damping: 24 };

// ─── SVG Helpers ─────────────────────────────────────────────────────────────

function hSegmentPath(
  normStart: number,
  normEnd: number,
  segW: number,
  H: number,
  layerScale: number,
  straight = false
) {
  const my = H / 2;
  const h0 = normStart * H * 0.44 * layerScale;
  const h1 = normEnd * H * 0.44 * layerScale;

  if (straight) {
    return `M 0 ${my - h0} L ${segW} ${my - h1} L ${segW} ${my + h1} L 0 ${my + h0} Z`;
  }

  const cx = segW * 0.55;
  const top = `M 0 ${my - h0} C ${cx} ${my - h0}, ${segW - cx} ${my - h1}, ${segW} ${my - h1}`;
  const bot = `L ${segW} ${my + h1} C ${segW - cx} ${my + h1}, ${cx} ${my + h0}, 0 ${my + h0}`;
  return `${top} ${bot} Z`;
}

function vSegmentPath(
  normStart: number,
  normEnd: number,
  segH: number,
  W: number,
  layerScale: number,
  straight = false
) {
  const mx = W / 2;
  const w0 = normStart * W * 0.44 * layerScale;
  const w1 = normEnd * W * 0.44 * layerScale;

  if (straight) {
    return `M ${mx - w0} 0 L ${mx - w1} ${segH} L ${mx + w1} ${segH} L ${mx + w0} 0 Z`;
  }

  const cy = segH * 0.55;
  const left = `M ${mx - w0} 0 C ${mx - w0} ${cy}, ${mx - w1} ${segH - cy}, ${mx - w1} ${segH}`;
  const right = `L ${mx + w1} ${segH} C ${mx + w1} ${segH - cy}, ${mx + w0} ${cy}, ${mx + w0} 0`;
  return `${left} ${right} Z`;
}

// ─── Animated Ring ───────────────────────────────────────────────────────────

function HRing({
  d,
  color,
  fill,
  opacity,
  hovered,
  ringIndex,
  totalRings,
}: {
  d: string;
  color: string;
  fill?: string;
  opacity: number;
  hovered: boolean;
  ringIndex: number;
  totalRings: number;
}) {
  const extraScale = 1 + (ringIndex / Math.max(totalRings - 1, 1)) * 0.12;
  const ringSpring = {
    stiffness: 300 - ringIndex * 60,
    damping: 24 - ringIndex * 3,
  };
  const scaleY = useSpring(1, ringSpring);

  useEffect(() => {
    scaleY.set(hovered ? extraScale : 1);
  }, [hovered, scaleY, extraScale]);

  return (
    <motion.path
      d={d}
      fill={fill ?? color}
      fillOpacity={opacity}
      style={{ scaleY, originX: "50%", originY: "50%" }}
    />
  );
}

function VRing({
  d,
  color,
  fill,
  opacity,
  hovered,
  ringIndex,
  totalRings,
}: {
  d: string;
  color: string;
  fill?: string;
  opacity: number;
  hovered: boolean;
  ringIndex: number;
  totalRings: number;
}) {
  const extraScale = 1 + (ringIndex / Math.max(totalRings - 1, 1)) * 0.12;
  const ringSpring = {
    stiffness: 300 - ringIndex * 60,
    damping: 24 - ringIndex * 3,
  };
  const scaleX = useSpring(1, ringSpring);

  useEffect(() => {
    scaleX.set(hovered ? extraScale : 1);
  }, [hovered, scaleX, extraScale]);

  return (
    <motion.path
      d={d}
      fill={fill ?? color}
      fillOpacity={opacity}
      style={{ scaleX, originX: "50%", originY: "50%" }}
    />
  );
}

// ─── Animated Segments ───────────────────────────────────────────────────────

function HSegment({
  index,
  normStart,
  normEnd,
  segW,
  fullH,
  color,
  layers,
  staggerDelay,
  hovered,
  dimmed,
  renderPattern,
  straight,
  gradientStops,
}: {
  index: number;
  normStart: number;
  normEnd: number;
  segW: number;
  fullH: number;
  color: string;
  layers: number;
  staggerDelay: number;
  hovered: boolean;
  dimmed: boolean;
  renderPattern?: (id: string, color: string) => ReactNode;
  straight: boolean;
  gradientStops?: FunnelGradientStop[];
}) {
  const patternId = `funnel-h-pattern-${index}`;
  const gradientId = `funnel-h-grad-${index}`;
  const growProgress = useSpring(0, springConfig);
  const entranceScaleX = useTransform(growProgress, [0, 1], [0, 1]);
  const entranceScaleY = useTransform(growProgress, [0, 1], [0, 1]);
  const dimOpacity = useSpring(1, hoverSpring);

  useEffect(() => {
    dimOpacity.set(dimmed ? 0.4 : 1);
  }, [dimmed, dimOpacity]);

  useEffect(() => {
    const timeout = setTimeout(
      () => growProgress.set(1),
      index * staggerDelay * 1000
    );
    return () => clearTimeout(timeout);
  }, [growProgress, index, staggerDelay]);

  const rings = Array.from({ length: layers }, (_, l) => {
    const scale = 1 - (l / layers) * 0.35;
    const opacity = 0.18 + (l / (layers - 1 || 1)) * 0.65;
    return {
      d: hSegmentPath(normStart, normEnd, segW, fullH, scale, straight),
      opacity,
    };
  });

  return (
    <motion.g style={{ opacity: dimOpacity }}>
      <motion.g
        style={{
          scaleX: entranceScaleX,
          scaleY: entranceScaleY,
          originX: "0%",
          originY: "50%",
        }}
      >
        <svg viewBox={`0 0 ${segW} ${fullH}`} width={segW} height={fullH} overflow="visible">
          <defs>
            {gradientStops && (
              <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
                {gradientStops.map((stop) => (
                  <stop key={String(stop.offset)} offset={stop.offset} stopColor={stop.color} />
                ))}
              </linearGradient>
            )}
            {renderPattern?.(patternId, color)}
          </defs>
          {rings.map((r, i) => {
            const isInnermost = i === rings.length - 1;
            let ringFill: string | undefined;
            if (isInnermost && renderPattern) {
              ringFill = `url(#${patternId})`;
            } else if (isInnermost && gradientStops) {
              ringFill = `url(#${gradientId})`;
            }
            return (
              <HRing
                key={i}
                d={r.d}
                color={color}
                fill={ringFill}
                opacity={r.opacity}
                hovered={hovered}
                ringIndex={i}
                totalRings={rings.length}
              />
            );
          })}
        </svg>
      </motion.g>
    </motion.g>
  );
}

function VSegment({
  index,
  normStart,
  normEnd,
  segH,
  fullW,
  color,
  layers,
  staggerDelay,
  hovered,
  dimmed,
  renderPattern,
  straight,
  gradientStops,
}: {
  index: number;
  normStart: number;
  normEnd: number;
  segH: number;
  fullW: number;
  color: string;
  layers: number;
  staggerDelay: number;
  hovered: boolean;
  dimmed: boolean;
  renderPattern?: (id: string, color: string) => ReactNode;
  straight: boolean;
  gradientStops?: FunnelGradientStop[];
}) {
  const patternId = `funnel-v-pattern-${index}`;
  const gradientId = `funnel-v-grad-${index}`;
  const growProgress = useSpring(0, springConfig);
  const entranceScaleY = useTransform(growProgress, [0, 1], [0, 1]);
  const entranceScaleX = useTransform(growProgress, [0, 1], [0, 1]);
  const dimOpacity = useSpring(1, hoverSpring);

  useEffect(() => {
    dimOpacity.set(dimmed ? 0.4 : 1);
  }, [dimmed, dimOpacity]);

  useEffect(() => {
    const timeout = setTimeout(
      () => growProgress.set(1),
      index * staggerDelay * 1000
    );
    return () => clearTimeout(timeout);
  }, [growProgress, index, staggerDelay]);

  const rings = Array.from({ length: layers }, (_, l) => {
    const scale = 1 - (l / layers) * 0.35;
    const opacity = 0.18 + (l / (layers - 1 || 1)) * 0.65;
    return {
      d: vSegmentPath(normStart, normEnd, segH, fullW, scale, straight),
      opacity,
    };
  });

  return (
    <motion.g style={{ opacity: dimOpacity }}>
      <motion.g
        style={{
          scaleY: entranceScaleY,
          scaleX: entranceScaleX,
          originX: "50%",
          originY: "0%",
        }}
      >
        <svg viewBox={`0 0 ${fullW} ${segH}`} width={fullW} height={segH} overflow="visible">
          <defs>
            {gradientStops && (
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                {gradientStops.map((stop) => (
                  <stop key={String(stop.offset)} offset={stop.offset} stopColor={stop.color} />
                ))}
              </linearGradient>
            )}
            {renderPattern?.(patternId, color)}
          </defs>
          {rings.map((r, i) => {
            const isInnermost = i === rings.length - 1;
            let ringFill: string | undefined;
            if (isInnermost && renderPattern) {
              ringFill = `url(#${patternId})`;
            } else if (isInnermost && gradientStops) {
              ringFill = `url(#${gradientId})`;
            }
            return (
              <VRing
                key={i}
                d={r.d}
                color={color}
                fill={ringFill}
                opacity={r.opacity}
                hovered={hovered}
                ringIndex={i}
                totalRings={rings.length}
              />
            );
          })}
        </svg>
      </motion.g>
    </motion.g>
  );
}

// ─── Label Overlay ───────────────────────────────────────────────────────────

function SegmentLabel({
  stage,
  pct,
  isHorizontal,
  showValues,
  showPercentage,
  showLabels,
  formatPercentage,
  formatValue,
  index,
  staggerDelay,
  layout = "spread",
  orientation,
  align = "center",
}: {
  stage: FunnelStage;
  pct: number;
  isHorizontal: boolean;
  showValues: boolean;
  showPercentage: boolean;
  showLabels: boolean;
  formatPercentage: (p: number) => string;
  formatValue: (v: number) => string;
  index: number;
  staggerDelay: number;
  layout?: "spread" | "grouped";
  orientation?: "vertical" | "horizontal";
  align?: "center" | "start" | "end";
}) {
  const display = stage.displayValue ?? formatValue(stage.value);

  const valueEl = showValues && (
    <span className="text-sm font-bold text-foreground">{display}</span>
  );
  const pctEl = showPercentage && (
    <span className="text-xs font-medium text-muted-foreground">{formatPercentage(pct)}</span>
  );
  const labelEl = showLabels && (
    <span className="text-xs text-muted-foreground">{stage.label}</span>
  );

  if (layout === "spread") {
    return (
      <div className="absolute inset-0 flex flex-col pointer-events-none">
        {isHorizontal ? (
          <>
            <div className="flex-1 flex items-start justify-center pt-1">
              {valueEl}
            </div>
            <div className="flex-none flex items-center justify-center">
              {pctEl}
            </div>
            <div className="flex-1 flex items-end justify-center pb-1">
              {labelEl}
            </div>
          </>
        ) : (
          <>
            <div className="flex-1 flex items-center justify-start pl-2">
              {valueEl}
            </div>
            <div className="flex-none flex items-center justify-center">
              {pctEl}
            </div>
            <div className="flex-1 flex items-center justify-end pr-2">
              {labelEl}
            </div>
          </>
        )}
      </div>
    );
  }

  const resolvedOrientation = orientation ?? (isHorizontal ? "vertical" : "horizontal");
  const isVerticalStack = resolvedOrientation === "vertical";

  const justifyMap = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
  } as const;
  const itemsMap = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
  } as const;

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div
        className={cn(
          "flex gap-0.5",
          isVerticalStack ? "flex-col" : "flex-row",
          isVerticalStack ? itemsMap[align] : justifyMap[align]
        )}
      >
        {valueEl}
        {pctEl}
        {labelEl}
      </div>
    </div>
  );
}

// ─── FunnelChart ─────────────────────────────────────────────────────────────

export function FunnelChart({
  data,
  orientation = "horizontal",
  color = "hsl(var(--primary))",
  layers = 3,
  className,
  style,
  showPercentage = true,
  showValues = true,
  showLabels = true,
  hoveredIndex: hoveredIndexProp,
  onHoverChange,
  formatPercentage = fmtPct,
  formatValue = fmtVal,
  staggerDelay = 0.12,
  gap = 4,
  renderPattern,
  edges = "curved",
  labelLayout = "spread",
  labelOrientation,
  labelAlign = "center",
  grid: gridProp = false,
}: FunnelChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [sz, setSz] = useState({ w: 0, h: 0 });
  const [internalHoveredIndex, setInternalHoveredIndex] = useState<number | null>(null);

  const isControlled = hoveredIndexProp !== undefined;
  const hoveredIndex = isControlled ? hoveredIndexProp : internalHoveredIndex;
  const setHoveredIndex = useCallback(
    (index: number | null) => {
      if (isControlled) {
        onHoverChange?.(index);
      } else {
        setInternalHoveredIndex(index);
      }
    },
    [isControlled, onHoverChange]
  );

  const measure = useCallback(() => {
    if (!ref.current) return;
    const { width: w, height: h } = ref.current.getBoundingClientRect();
    if (w > 0 && h > 0) setSz({ w, h });
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [measure]);

  if (!data.length) return null;
  const first = data[0];
  if (!first) return null;

  const max = first.value;
  const n = data.length;
  const norms = data.map((d) => d.value / max);
  const horiz = orientation === "horizontal";
  const { w: W, h: H } = sz;

  const totalGap = gap * (n - 1);
  const segW = (W - (horiz ? totalGap : 0)) / n;
  const segH = (H - (horiz ? 0 : totalGap)) / n;

  const gridEnabled = gridProp !== false;
  const gridCfg = typeof gridProp === "object" ? gridProp : {};
  const showBands = gridEnabled && (gridCfg.bands ?? true);
  const bandColor = gridCfg.bandColor ?? "hsl(var(--muted))";
  const showGridLines = gridEnabled && (gridCfg.lines ?? true);
  const gridLineColor = gridCfg.lineColor ?? "hsl(var(--border))";
  const gridLineOpacity = gridCfg.lineOpacity ?? 1;
  const gridLineWidth = gridCfg.lineWidth ?? 1;

  return (
    <div ref={ref} className={cn("relative w-full h-full", className)} style={style}>
      {W > 0 && H > 0 && (
        <>
          {gridEnabled && (
            <svg className="absolute inset-0" width={W} height={H}>
              {showBands &&
                data.map((_, i) => {
                  if (i % 2 !== 0) return null;
                  if (horiz) {
                    const x = (segW + gap) * i;
                    return <rect key={i} x={x} y={0} width={segW} height={H} fill={bandColor} fillOpacity={0.15} />;
                  }
                  const y = (segH + gap) * i;
                  return <rect key={i} x={0} y={y} width={W} height={segH} fill={bandColor} fillOpacity={0.15} />;
                })}
            </svg>
          )}

          <svg className="absolute inset-0" width={W} height={H} overflow="visible">
            {data.map((stage, i) => {
              const normStart = norms[i] ?? 0;
              const normEnd = norms[Math.min(i + 1, n - 1)] ?? 0;
              const firstStop = stage.gradient?.[0];
              const segColor = firstStop ? firstStop.color : (stage.color ?? color);

              return horiz ? (
                <g key={i} transform={`translate(${(segW + gap) * i}, 0)`}>
                  <HSegment
                    index={i}
                    normStart={normStart}
                    normEnd={normEnd}
                    segW={segW}
                    fullH={H}
                    color={segColor}
                    layers={layers}
                    staggerDelay={staggerDelay}
                    hovered={hoveredIndex === i}
                    dimmed={hoveredIndex !== null && hoveredIndex !== i}
                    renderPattern={renderPattern}
                    straight={edges === "straight"}
                    gradientStops={stage.gradient}
                  />
                </g>
              ) : (
                <g key={i} transform={`translate(0, ${(segH + gap) * i})`}>
                  <VSegment
                    index={i}
                    normStart={normStart}
                    normEnd={normEnd}
                    segH={segH}
                    fullW={W}
                    color={segColor}
                    layers={layers}
                    staggerDelay={staggerDelay}
                    hovered={hoveredIndex === i}
                    dimmed={hoveredIndex !== null && hoveredIndex !== i}
                    renderPattern={renderPattern}
                    straight={edges === "straight"}
                    gradientStops={stage.gradient}
                  />
                </g>
              );
            })}
          </svg>

          {gridEnabled && showGridLines && (
            <svg className="absolute inset-0" width={W} height={H}>
              {Array.from({ length: n - 1 }, (_, i) => {
                const idx = i + 1;
                if (horiz) {
                  const x = segW * idx + gap * i + gap / 2;
                  return <line key={i} x1={x} y1={0} x2={x} y2={H} stroke={gridLineColor} strokeWidth={gridLineWidth} strokeOpacity={gridLineOpacity} />;
                }
                const y = segH * idx + gap * i + gap / 2;
                return <line key={i} x1={0} y1={y} x2={W} y2={y} stroke={gridLineColor} strokeWidth={gridLineWidth} strokeOpacity={gridLineOpacity} />;
              })}
            </svg>
          )}

          {data.map((stage, i) => {
            const pct = (stage.value / max) * 100;
            const posStyle: CSSProperties = horiz
              ? { left: (segW + gap) * i, width: segW, top: 0, height: H }
              : { top: (segH + gap) * i, height: segH, left: 0, width: W };
            const isDimmed = hoveredIndex !== null && hoveredIndex !== i;

            return (
              <motion.div
                key={i}
                className="absolute"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ ...posStyle, zIndex: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                <SegmentLabel
                  stage={stage}
                  pct={pct}
                  isHorizontal={horiz}
                  showValues={showValues}
                  showPercentage={showPercentage}
                  showLabels={showLabels}
                  formatPercentage={formatPercentage}
                  formatValue={formatValue}
                  index={i}
                  staggerDelay={staggerDelay}
                  layout={labelLayout}
                  orientation={labelOrientation}
                  align={labelAlign}
                />
              </motion.div>
            );
          })}
        </>
      )}
    </div>
  );
}

FunnelChart.displayName = "FunnelChart";
export default FunnelChart;
