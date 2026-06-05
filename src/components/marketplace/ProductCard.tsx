import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { formatINR } from "../../lib/demo-data";
import { useStore } from "../../lib/store";
import { Button } from "../../components/ui/button";
import { Product } from "../../lib/demo-data";


export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const wished = wishlist.some((w) => w.id === product.id);
  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group glass-card overflow-hidden rounded-xl"
    >
      <Link to="/product/$id" params={{ id: product.id }} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img src={product.image} alt={product.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
          {off > 0 && (
            <span className="absolute left-2 top-2 rounded-md bg-destructive px-2 py-0.5 text-[10px] font-bold text-destructive-foreground">{off}% OFF</span>
          )}
          {product.featured && (
            <span className="absolute right-2 top-2 rounded-md gradient-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">FEATURED</span>
          )}
        </div>
      </Link>
      <div className="space-y-2 p-3">
        <Link to="/product/$id" params={{ id: product.id }} className="line-clamp-2 text-sm font-medium hover:text-primary">{product.title}</Link>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-0.5 rounded bg-success/10 px-1.5 py-0.5 font-medium text-success">
            <Star className="h-3 w-3 fill-current" /> {product.rating.toFixed(1)}
          </span>
          <span>({product.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold">{formatINR(product.price)}</span>
          <span className="text-xs text-muted-foreground line-through">{formatINR(product.mrp)}</span>
        </div>
        <p className="truncate text-[11px] text-muted-foreground">by {product.sellerName}</p>
        <div className="flex gap-2 pt-1">
          <Button size="sm" className="flex-1 gap-1" onClick={(e) => { e.preventDefault(); addToCart(product); toast.success("Added to cart"); }}>
            <ShoppingCart className="h-3.5 w-3.5" />Add
          </Button>
          <Button size="sm" variant="outline" onClick={(e) => { e.preventDefault(); toggleWishlist(product); toast(wished ? "Removed from wishlist" : "Added to wishlist"); }}>
            <Heart className={`h-3.5 w-3.5 ${wished ? "fill-destructive text-destructive" : ""}`} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
