"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

const FREE_SHIPPING_THRESHOLD = 35;

export default function CartDrawer() {
  const { items, count, subtotal, isOpen, close, setQty, remove } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const qualifiesFreeShip = remaining === 0 && subtotal > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[95] bg-black/55 backdrop-blur-sm"
          onClick={close}
        >
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 right-0 h-full w-full sm:w-[440px] bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-[68px] border-b border-[#0E1116]/10 shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-[#F26A1F]" />
                <h2 className="font-syne font-bold text-lg text-[#0E1116]">
                  Your cart
                </h2>
                <span className="font-dm text-xs text-[#6A6A73]">
                  ({count} {count === 1 ? "item" : "items"})
                </span>
              </div>
              <button
                aria-label="Close cart"
                onClick={close}
                className="text-[#0E1116] p-2 -mr-2 rounded-full hover:bg-[#0E1116]/5 transition"
              >
                <X size={22} />
              </button>
            </div>

            {/* Free-shipping bar */}
            {items.length > 0 && (
              <div className="px-6 py-3 border-b border-[#0E1116]/10 bg-[#FAF7F2] shrink-0">
                <div className="font-dm text-xs text-[#0E1116]/75 mb-2">
                  {qualifiesFreeShip ? (
                    <span className="text-[#F26A1F] font-semibold">
                      You&apos;ve unlocked free U.S. shipping!
                    </span>
                  ) : (
                    <>
                      Add{" "}
                      <span className="font-semibold text-[#0E1116]">
                        ${remaining.toFixed(2)}
                      </span>{" "}
                      more for free U.S. shipping
                    </>
                  )}
                </div>
                <div className="h-1.5 rounded-full bg-[#0E1116]/10 overflow-hidden">
                  <div
                    className="h-full bg-[#F26A1F] transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-8">
                  <div className="w-16 h-16 rounded-full bg-[#FFF1E6] text-[#F26A1F] flex items-center justify-center mb-5">
                    <ShoppingBag size={26} />
                  </div>
                  <h3 className="font-syne font-bold text-xl text-[#0E1116] mb-2">
                    Your cart is empty
                  </h3>
                  <p className="font-dm text-sm text-[#6A6A73] mb-6 max-w-xs">
                    Browse our collections and add a puzzle to get started.
                  </p>
                  <Link
                    href="/shop"
                    onClick={close}
                    className="inline-flex items-center bg-[#F26A1F] hover:bg-[#E05A10] text-white font-bold text-sm px-6 py-3 rounded-full transition-colors shadow-[0_10px_28px_-6px_rgba(242,106,31,0.55)]"
                  >
                    Shop puzzles
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-[#0E1116]/10">
                  {items.map((it) => (
                    <li key={it.id} className="px-6 py-5 flex gap-4">
                      <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-[#F4F4F5] ring-1 ring-[#0E1116]/10">
                        <Image
                          src={it.image}
                          alt={it.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            {it.collection && (
                              <div className="font-dm text-[10px] uppercase tracking-[0.22em] text-[#B7541F] mb-0.5">
                                {it.collection}
                              </div>
                            )}
                            <div className="font-syne font-bold text-[#0E1116] text-sm leading-snug truncate">
                              {it.title}
                            </div>
                            <div className="font-dm text-xs text-[#6A6A73] mt-0.5">
                              {it.pieces} pc
                              {it.material ? ` · ${it.material}` : ""}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(it.id)}
                            aria-label={`Remove ${it.title}`}
                            className="text-[#0E1116]/45 hover:text-[#F26A1F] transition shrink-0 p-1 -mt-1 -mr-1"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center border border-[#0E1116]/15 rounded-full">
                            <button
                              type="button"
                              onClick={() => setQty(it.id, it.qty - 1)}
                              aria-label="Decrease quantity"
                              className="w-8 h-8 flex items-center justify-center text-[#0E1116] hover:text-[#F26A1F] transition"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="font-dm font-semibold text-[#0E1116] text-sm w-7 text-center">
                              {it.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQty(it.id, it.qty + 1)}
                              aria-label="Increase quantity"
                              className="w-8 h-8 flex items-center justify-center text-[#0E1116] hover:text-[#F26A1F] transition"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                          <div className="font-syne font-extrabold text-[#0E1116] text-sm">
                            ${(it.price * it.qty).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[#0E1116]/10 px-6 py-5 bg-white shrink-0">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-dm text-sm text-[#0E1116]/70">
                    Subtotal
                  </span>
                  <span className="font-syne font-extrabold text-[#0E1116] text-2xl">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <p className="font-dm text-xs text-[#6A6A73] mb-4">
                  Shipping &amp; taxes calculated at checkout.
                </p>
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#F26A1F] hover:bg-[#E05A10] text-white font-bold px-6 py-3.5 rounded-full transition-colors shadow-[0_10px_28px_-6px_rgba(242,106,31,0.55)]"
                >
                  Checkout
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="w-full mt-3 font-dm text-sm text-[#0E1116]/65 hover:text-[#F26A1F] transition"
                >
                  Continue shopping
                </button>
              </div>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
