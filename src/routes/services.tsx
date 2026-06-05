import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./../components/ui/button";
import { services, formatINR } from "./../lib/demo-data";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [{ title: "Services — Bazaaro" }, { name: "description", content: "Book trusted services at your doorstep." }] }),
  component: () => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">Services</h1>
      <p className="text-muted-foreground">Verified professionals, transparent pricing, instant booking.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {services.map((s) => (
          <div key={s.id} className="glass-card overflow-hidden rounded-xl">
            <img src={s.image} alt={s.name} className="h-48 w-full object-cover" />
            <div className="p-4">
              <div className="text-xs text-primary">{s.category}</div>
              <h3 className="mt-1 text-lg font-semibold">{s.name}</h3>
              <div className="text-sm text-muted-foreground">by {s.provider}</div>
              <div className="mt-2 flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-accent text-accent" />{s.rating.toFixed(1)}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-xl font-bold text-primary">{formatINR(s.price)}</div>
                <Button size="sm" onClick={() => toast.success(`Booked: ${s.name}`)}>Book Now</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
});
