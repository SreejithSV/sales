import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Star } from "lucide-react";
import { sellers } from "./../lib/demo-data";

export const Route = createFileRoute("/sellers")({
  head: () => ({ meta: [{ title: "Sellers — Bazaaro" }] }),
  component: () => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Top Sellers</h1>
      <p className="text-muted-foreground">Discover trusted sellers across India.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sellers.map((s) => (
          <Link key={s.id} to="/seller/$id" params={{ id: s.id }} className="glass-card rounded-xl p-4 hover:shadow-glow">
            <div className="flex items-center gap-3">
              <img src={s.image} alt={s.name} className="h-14 w-14 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 font-semibold truncate">{s.name}{s.verified && <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" />}</div>
                <div className="text-xs text-muted-foreground">{s.city} · since {s.since}</div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-accent text-accent" />{s.rating.toFixed(1)}</span>
              <span className="text-muted-foreground">{s.products} products</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  ),
});
