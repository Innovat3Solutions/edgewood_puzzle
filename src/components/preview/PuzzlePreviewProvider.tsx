"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut, ShoppingCart } from "lucide-react";
import type { PuzzleVariant } from "@/data/puzzles";
import { useCart } from "@/components/cart/CartProvider";

export type PuzzlePreviewPayload = {
  image: string;
  title: string;
  subtitle?: string;
  collection?: string;
  pieces?: string | number;
  packaging?: string;
  variants?: PuzzleVariant[];
  material?: string;
  dimensions?: string;
  slug?: string;
};

type Ctx = {
  open: (p: PuzzlePreviewPayload) => void;
  close: () => void;
};

const PreviewCtx = createContext<Ctx | null>(null);

export function usePuzzlePreview() {
  const ctx = useContext(PreviewCtx);
  if (!ctx) throw new Error("usePuzzlePreview must be used inside <PuzzlePreviewProvider>");
  return ctx;
}

export default function PuzzlePreviewProvider({ children }: { children: React.ReactNode }) {
  const { add: addToCart } = useCart();
  const [payload, setPayload] = useState<PuzzlePreviewPayload | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [selectedPieces, setSelectedPieces] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  const open = useCallback((p: PuzzlePreviewPayload) => {
    setPayload(p);
    setActiveImage(p.image);
    const defaultPieces =
      p.variants && p.variants.length > 0
        ? (typeof p.pieces === "number" && p.variants.find((v) => v.pieces === p.pieces)
            ? p.pieces
            : p.variants[0].pieces)
        : null;
    setSelectedPieces(defaultPieces);
    setZoomed(false);
    setPan({ x: 0, y: 0 });
  }, []);

  const close = useCallback(() => {
    setPayload(null);
    setActiveImage("");
    setSelectedPieces(null);
    setZoomed(false);
    setPan({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (!payload) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [payload, close]);

  const toggleZoom = () => {
    setZoomed((z) => !z);
    setPan({ x: 0, y: 0 });
  };

  const onImgPointerDown = (e: React.PointerEvent) => {
    if (!zoomed) return;
    draggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onImgPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPan({ x: dragStartRef.current.panX + dx, y: dragStartRef.current.panY + dy });
  };
  const onImgPointerUp = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch {}
  };
  const onImgClick = () => {
    if (!draggingRef.current) toggleZoom();
  };

  const variants = payload?.variants ?? [];
  const selectedVariant: PuzzleVariant | null = useMemo(() => {
    if (!variants.length) return null;
    return variants.find((v) => v.pieces === selectedPieces) ?? variants[0];
  }, [variants, selectedPieces]);

  const views =
    payload && payload.packaging
      ? [
          { src: payload.image, label: "Artwork" },
          { src: payload.packaging, label: "Packaging" },
        ]
      : null;

  return (
    <PreviewCtx.Provider value={{ open, close }}>
      {children}
      <AnimatePresence>
        {payload && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white rounded-2xl overflow-hidden w-full max-w-6xl max-h-[92vh] flex flex-col md:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                aria-label="Close preview"
                onClick={close}
                className="absolute top-3 right-3 z-30 bg-white/95 hover:bg-white text-[#0E1116] rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-colors"
              >
                <X size={18} />
              </button>

              {/* IMAGE PANEL */}
              <div
                className="relative w-full md:w-[60%] bg-[#0E0E10] overflow-hidden flex items-center justify-center select-none shrink-0"
                style={{
                  minHeight: 320,
                  maxHeight: "92vh",
                  cursor: zoomed ? (draggingRef.current ? "grabbing" : "grab") : "zoom-in",
                  touchAction: zoomed ? "none" : "auto",
                }}
                onPointerDown={onImgPointerDown}
                onPointerMove={onImgPointerMove}
                onPointerUp={onImgPointerUp}
                onPointerCancel={onImgPointerUp}
                onClick={onImgClick}
              >
                <div
                  className="relative w-full h-full aspect-[4/3] md:aspect-auto md:h-[clamp(420px,80vh,820px)]"
                  style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomed ? 2.2 : 1})`,
                    transition: draggingRef.current ? "none" : "transform 260ms cubic-bezier(0.16,1,0.3,1)",
                    willChange: "transform",
                  }}
                >
                  <Image
                    src={activeImage || payload.image}
                    alt={payload.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-contain pointer-events-none"
                    priority
                    draggable={false}
                  />
                </div>

                {/* View toggle (Artwork / Packaging) */}
                {views && (
                  <div
                    className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-black/55 backdrop-blur-sm rounded-full p-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {views.map((v) => {
                      const isActive = (activeImage || payload.image) === v.src;
                      return (
                        <button
                          key={v.src}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImage(v.src);
                            setZoomed(false);
                            setPan({ x: 0, y: 0 });
                          }}
                          className={`font-dm text-[11px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full transition-colors ${
                            isActive
                              ? "bg-white text-[#0E1116]"
                              : "text-white/85 hover:text-white"
                          }`}
                          aria-pressed={isActive}
                        >
                          {v.label}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Zoom button */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 z-10">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleZoom(); }}
                    className="bg-white/95 hover:bg-white text-[#0E1116] rounded-full h-9 px-3 flex items-center gap-1.5 shadow-md text-xs font-semibold transition-colors"
                    aria-label={zoomed ? "Zoom out" : "Zoom in"}
                  >
                    {zoomed ? <ZoomOut size={14} /> : <ZoomIn size={14} />}
                    {zoomed ? "Fit" : "Zoom"}
                  </button>
                  {zoomed && (
                    <span className="text-white/80 text-[11px] font-dm bg-black/40 px-2.5 py-1.5 rounded-full">
                      Drag to pan
                    </span>
                  )}
                </div>

                {/* Thumbnail strip (mirrors view toggle, helpful for tap targets) */}
                {views && (
                  <div
                    className="absolute bottom-3 right-3 z-10 hidden sm:flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {views.map((v) => {
                      const isActive = (activeImage || payload.image) === v.src;
                      return (
                        <button
                          key={`thumb-${v.src}`}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImage(v.src);
                            setZoomed(false);
                            setPan({ x: 0, y: 0 });
                          }}
                          aria-label={`Show ${v.label}`}
                          className={`relative w-14 h-14 rounded-lg overflow-hidden ring-2 transition ${
                            isActive ? "ring-white" : "ring-white/30 hover:ring-white/70"
                          }`}
                        >
                          <Image
                            src={v.src}
                            alt={v.label}
                            fill
                            sizes="56px"
                            className="object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* INFO PANEL */}
              <div className="flex-1 flex flex-col bg-white overflow-y-auto">
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  {payload.collection && (
                    <div className="font-dm text-[11px] tracking-[0.28em] uppercase text-[#B7541F] mb-2">
                      {payload.collection}
                    </div>
                  )}
                  <h3
                    className="font-syne font-extrabold text-[#0E1116] tracking-[-0.02em] leading-[1.05]"
                    style={{ fontSize: "clamp(26px, 2.6vw, 38px)" }}
                  >
                    {payload.title}
                  </h3>
                  {payload.subtitle && (
                    <p className="font-dm text-sm italic text-[#6A6A73] mt-1.5">
                      {payload.subtitle}
                    </p>
                  )}

                  {/* Spec chips */}
                  {(payload.material || payload.dimensions ||
                    (!variants.length && payload.pieces !== undefined)) && (
                    <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-dm text-xs text-[#6A6A73]">
                      {!variants.length && payload.pieces !== undefined && (
                        <>
                          <span>
                            {typeof payload.pieces === "number"
                              ? `${payload.pieces} pieces`
                              : payload.pieces}
                          </span>
                          {(payload.material || payload.dimensions) && (
                            <span className="w-1 h-1 rounded-full bg-[#0E1116]/25" />
                          )}
                        </>
                      )}
                      {payload.material && (
                        <>
                          <span>{payload.material}</span>
                          {payload.dimensions && (
                            <span className="w-1 h-1 rounded-full bg-[#0E1116]/25" />
                          )}
                        </>
                      )}
                      {payload.dimensions && <span>{payload.dimensions}</span>}
                    </div>
                  )}

                  {/* Variant selector */}
                  {variants.length > 0 && (
                    <div className="mt-6">
                      <div className="font-dm text-[11px] uppercase tracking-[0.24em] text-[#0E1116]/60 mb-2.5">
                        {variants.length > 1 ? "Choose piece count" : "Piece count"}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {variants.map((v) => {
                          const isActive = selectedVariant?.pieces === v.pieces;
                          return (
                            <button
                              key={v.pieces}
                              type="button"
                              onClick={() => setSelectedPieces(v.pieces)}
                              className={`flex flex-col items-start text-left rounded-xl border px-4 py-2.5 transition-all ${
                                isActive
                                  ? "border-[#0E1116] bg-[#0E1116] text-white shadow-[0_8px_24px_-12px_rgba(14,17,22,0.45)]"
                                  : "border-[#0E1116]/15 bg-white text-[#0E1116] hover:border-[#0E1116]/45"
                              }`}
                              aria-pressed={isActive}
                            >
                              <span className="font-syne font-extrabold text-base leading-none">
                                {v.pieces}
                                <span className="ml-1 font-dm text-[10px] uppercase tracking-[0.2em] opacity-70">
                                  pc
                                </span>
                              </span>
                              <span
                                className={`font-dm text-xs mt-1 ${
                                  isActive ? "text-white/80" : "text-[#6A6A73]"
                                }`}
                              >
                                ${v.price.toFixed(2)}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Total + CTA */}
                  {selectedVariant && (
                    <div className="mt-auto pt-8">
                      <div className="flex items-baseline justify-between gap-4 pb-4 border-t border-[#0E1116]/10 pt-5">
                        <div>
                          <div className="font-dm text-[11px] uppercase tracking-[0.28em] text-[#0E1116]/55">
                            Total
                          </div>
                          <div className="font-syne font-extrabold text-[#0E1116] text-3xl md:text-4xl leading-none mt-1">
                            ${selectedVariant.price.toFixed(2)}
                          </div>
                        </div>
                        <div className="font-dm text-xs text-[#6A6A73] text-right leading-snug">
                          {selectedVariant.pieces} pc
                          {payload.material ? ` · ${payload.material}` : ""}
                          <br />
                          Free U.S. shipping over $35
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (!payload || !selectedVariant) return;
                          addToCart({
                            slug:
                              payload.slug ??
                              `${payload.title}-${selectedVariant.pieces}`
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-"),
                            title: payload.title,
                            subtitle: payload.subtitle,
                            image: payload.image,
                            collection: payload.collection,
                            pieces: selectedVariant.pieces,
                            price: selectedVariant.price,
                            material: payload.material,
                            dimensions: payload.dimensions,
                          });
                          close();
                        }}
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#F26A1F] hover:bg-[#E05A10] text-white font-bold px-6 py-3.5 rounded-full transition-colors shadow-[0_10px_28px_-6px_rgba(242,106,31,0.55)]"
                      >
                        <ShoppingCart size={18} />
                        Add to cart
                      </button>
                    </div>
                  )}

                  {!selectedVariant && (
                    <div className="mt-auto pt-8">
                      <button
                        onClick={close}
                        className="inline-flex items-center text-[#0E1116] font-semibold px-3 py-3 border-b-2 border-[#0E1116] hover:text-[#F26A1F] hover:border-[#F26A1F] transition-colors"
                      >
                        Close preview
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PreviewCtx.Provider>
  );
}
