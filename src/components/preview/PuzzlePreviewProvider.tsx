"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ZoomOut } from "lucide-react";

export type PuzzlePreviewPayload = {
  image: string;
  title: string;
  collection?: string;
  pieces?: string | number;
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
  const [payload, setPayload] = useState<PuzzlePreviewPayload | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  const open = useCallback((p: PuzzlePreviewPayload) => {
    setPayload(p);
    setZoomed(false);
    setPan({ x: 0, y: 0 });
  }, []);

  const close = useCallback(() => {
    setPayload(null);
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
    // Ignore clicks that were actually drags.
    if (!draggingRef.current) toggleZoom();
  };

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
              className="relative bg-[#FBEADB] rounded-2xl overflow-hidden w-full max-w-6xl max-h-[92vh] flex flex-col md:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                aria-label="Close preview"
                onClick={close}
                className="absolute top-3 right-3 z-20 bg-white/95 hover:bg-white text-[#0E1116] rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-colors"
              >
                <X size={18} />
              </button>

              <div
                className="relative w-full md:w-[66%] bg-[#0E0E10] overflow-hidden flex items-center justify-center select-none"
                style={{
                  minHeight: 360,
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
                    src={payload.image}
                    alt={payload.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-contain pointer-events-none"
                    priority
                    draggable={false}
                  />
                </div>

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
              </div>

              <div className="flex-1 p-6 md:p-8 flex flex-col bg-[#FBEADB]">
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
                {payload.pieces && (
                  <div className="font-dm text-sm text-[#6A6A73] mt-2">
                    {typeof payload.pieces === "number" ? `${payload.pieces} pieces` : payload.pieces}
                  </div>
                )}
                <p className="font-dm text-[#55555E] leading-[1.65] mt-5">
                  Click or tap the image to zoom in. Drag to pan around and look at the detail up close.
                </p>
                <div className="mt-auto pt-8">
                  <button
                    onClick={close}
                    className="inline-flex items-center text-[#0E1116] font-semibold px-3 py-3 border-b-2 border-[#0E1116] hover:text-[#F26A1F] hover:border-[#F26A1F] transition-colors"
                  >
                    Close preview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PreviewCtx.Provider>
  );
}
