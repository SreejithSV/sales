import { createFileRoute } from "@tanstack/react-router";
import { Phone, Star } from "lucide-react";
import { Button } from "./../components/ui/button";
import { businesses } from "./../lib/demo-data";

export const Route = createFileRoute("/businesses")({
  head: () => ({ meta: [{ title: "Businesses — Bazaaro" }] }),
  component: () => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Local Businesses</h1>
      <p className="text-muted-foreground">Connect with trusted businesses in your city.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {businesses.map((b) => (
          <div key={b.id} className="glass-card overflow-hidden rounded-xl">
            <img src={b.image} alt={b.name} className="h-40 w-full object-cover" />
            <div className="p-4">
              <div className="text-xs text-primary">{b.category}</div>
              <h3 className="mt-1 text-lg font-semibold">{b.name}</h3>
              <div className="text-sm text-muted-foreground">{b.city}</div>
              <div className="mt-2 flex items-center justify-between">
                <span className="flex items-center gap-1 text-sm"><Star className="h-4 w-4 fill-accent text-accent" />{b.rating.toFixed(1)}</span>
                <Button size="sm" variant="outline"><Phone className="mr-1 h-3.5 w-3.5" />Call</Button>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{b.phone}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
});
