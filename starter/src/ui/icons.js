import { createIcons, ShoppingBag, Plus, ArrowRight, ArrowDown, ArrowLeft, ArrowUpRight, MapPin, Rotate3d } from 'lucide';

/** Lucide, tree-shaken: only the icons the page uses. `<i data-lucide="name">` → inline SVG (aria-hidden). */
export function initIcons() {
  createIcons({ icons: { ShoppingBag, Plus, ArrowRight, ArrowDown, ArrowLeft, ArrowUpRight, MapPin, Rotate3d }, attrs: { 'aria-hidden': 'true', 'stroke-width': 1.5 } });
}
