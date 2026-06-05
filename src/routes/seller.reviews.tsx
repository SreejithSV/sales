import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { products } from "./../lib/demo-data";

export const Route = createFileRoute("/seller/reviews")({
  component: () => (
    <div>
      <h1 className="text-2xl font-bold">Reviews</h1>
      <div className="mt-4 space-y-3">
        {products.slice(0, 8).map((p, i) => (
          <div key={p.id} className="glass-card flex gap-3 rounded-xl p-4">
            <img src={p.image} className="h-14 w-14 rounded object-cover" />
            <div className="flex-1">
              <div className="font-semibold">{p.title}</div>
              <div className="text-xs text-muted-foreground">Reviewed by User {i + 1}</div>
              <div className="mt-1 flex gap-0.5 text-accent">{[...Array(5)].map((_, x) => <Star key={x} className={`h-3.5 w-3.5 ${x < 4 ? "fill-current" : ""}`} />)}</div>
              <p className="mt-1 text-sm text-muted-foreground">Great product! Exactly as described and shipped quickly.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
});
