import { Screenshot } from "@/components/ui/screenshot";
import { GALLERY } from "@/lib/screenshots";

/**
 * Horizontal scroll-snap gallery: no carousel library, works with touch,
 * trackpad, and keyboard (the region is focusable and scrolls with arrows).
 */
export function Gallery() {
  return (
    <div
      role="region"
      aria-label="Product screenshots, scroll sideways for more"
      tabIndex={0}
      className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6"
    >
      {GALLERY.map((id) => (
        <div key={id} className="w-[85%] shrink-0 snap-start sm:w-[60%] lg:w-[46%]">
          <Screenshot id={id} caption sizes="(min-width: 1024px) 46vw, 85vw" />
        </div>
      ))}
    </div>
  );
}
