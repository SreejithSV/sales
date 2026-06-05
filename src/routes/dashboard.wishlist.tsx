import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "./../lib/store";
import { ProductCard } from "./../components/marketplace/ProductCard";

export const Route = createFileRoute("/dashboard/wishlist")({
  component: () => {
    const { wishlist } = useStore();
    return (
      <div>
        <h1 className="text-2xl font-bold">Wishlist ({wishlist.length})</h1>
        {wishlist.length ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {wishlist.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : <div className="glass-card mt-4 rounded-xl p-12 text-center text-muted-foreground">No saved products.</div>}
      </div>
    );
  },
});
