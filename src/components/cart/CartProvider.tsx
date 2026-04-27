"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import CartDrawer from "@/components/cart/CartDrawer";

export type CartItem = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  image: string;
  collection?: string;
  pieces: number;
  price: number;
  material?: string;
  dimensions?: string;
  qty: number;
};

export type AddCartInput = Omit<CartItem, "id" | "qty"> & { qty?: number };

type CartCtx = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (input: AddCartInput) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const Ctx = createContext<CartCtx | null>(null);

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

const STORAGE_KEY = "edgewood-cart-v1";

const lineId = (slug: string, pieces: number) => `${slug}::${pieces}`;

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: CartItem[] = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const add = useCallback((input: AddCartInput) => {
    const id = lineId(input.slug, input.pieces);
    const qty = Math.max(1, input.qty ?? 1);
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      const item: CartItem = {
        id,
        slug: input.slug,
        title: input.title,
        subtitle: input.subtitle,
        image: input.image,
        collection: input.collection,
        pieces: input.pieces,
        price: input.price,
        material: input.material,
        dimensions: input.dimensions,
        qty,
      };
      return [...prev, item];
    });
    setIsOpen(true);
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((i) => i.id !== id);
      return prev.map((i) => (i.id === id ? { ...i, qty } : i));
    });
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.price * i.qty, 0),
    [items]
  );

  const value: CartCtx = {
    items,
    count,
    subtotal,
    add,
    remove,
    setQty,
    clear,
    open,
    close,
    isOpen,
  };

  return (
    <Ctx.Provider value={value}>
      {children}
      <CartDrawer />
    </Ctx.Provider>
  );
}
