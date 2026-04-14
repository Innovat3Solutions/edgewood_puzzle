import type { ReactNode } from "react";

type Props<T> = {
  items: T[];
  render: (item: T, index: number) => ReactNode;
  /**
   * Full Tailwind class string for the desktop (md+) container. Must be
   * written as literal classes in the caller's source so Tailwind JIT picks
   * them up. Example: "hidden md:grid md:grid-cols-3 md:gap-6".
   */
  desktopClassName: string;
  /** Width of each carousel item at mobile. Defaults to 85% viewport. */
  itemWidth?: string;
  /** Gap between carousel items at mobile. */
  mobileGapClassName?: string;
  keyOf?: (item: T, index: number) => string | number;
};

export default function MobileCarousel<T>({
  items,
  render,
  desktopClassName,
  itemWidth = "85%",
  mobileGapClassName = "gap-4",
  keyOf,
}: Props<T>) {
  return (
    <>
      <div
        className={`md:hidden flex ${mobileGapClassName} overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]`}
      >
        {items.map((item, i) => (
          <div
            key={keyOf ? keyOf(item, i) : i}
            className="shrink-0 snap-start"
            style={{ width: itemWidth }}
          >
            {render(item, i)}
          </div>
        ))}
      </div>
      <div className={desktopClassName}>
        {items.map((item, i) => (
          <div key={keyOf ? keyOf(item, i) : i}>{render(item, i)}</div>
        ))}
      </div>
    </>
  );
}
