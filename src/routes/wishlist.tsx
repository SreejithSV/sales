import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Button } from "./../components/ui/button";
import { useStore } from "./../lib/store";
import { ProductCard } from ".././components/marketplace/ProductCard";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — Bazaaro" }] }),
  component: () => {
    const { wishlist } = useStore();
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="flex items-center gap-2 text-2xl font-bold"><Heart className="h-6 w-6 text-destructive" />My Wishlist ({wishlist.length})</h1>
        {wishlist.length ? (
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {wishlist.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="glass-card mt-8 rounded-xl p-12 text-center">
            <p className="text-muted-foreground">Your wishlist is empty.</p>
            <Link to="/products"><Button className="mt-4">Browse Products</Button></Link>
          </div>
        )}
      </div>
    );
  },
});
