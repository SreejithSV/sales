import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, Heart, Wallet, ShoppingBag } from "lucide-react";
import { formatINR, orders } from "./../lib/demo-data";
import { useStore } from "./../lib/store";

export const Route = createFileRoute("/dashboard/")({
  component: () => {
    const { wishlist, cart } = useStore();
    const stats = [
      { i: Package, l: "Total Orders", v: orders.length, c: "text-primary" },
      { i: ShoppingBag, l: "In Cart", v: cart.length, c: "text-accent" },
      { i: Heart, l: "Wishlist", v: wishlist.length, c: "text-destructive" },
      { i: Wallet, l: "Wallet", v: formatINR(2480), c: "text-success" },
    ];
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, Aarav 👋</h1>
          <p className="text-muted-foreground">Here's what's happening with your account.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="glass-card flex items-center gap-3 rounded-xl p-4">
              <div className={`grid h-12 w-12 place-items-center rounded-lg bg-muted ${s.c}`}><s.i className="h-5 w-5" /></div>
              <div><div className="text-2xl font-bold">{s.v}</div><div className="text-xs text-muted-foreground">{s.l}</div></div>
            </div>
          ))}
        </div>
        <div className="glass-card rounded-xl p-5">
          <h2 className="mb-3 font-semibold">Recent Orders</h2>
          <div className="divide-y">
            {orders.slice(0, 5).map((o) => (
              <div key={o.id} className="flex items-center justify-between py-3 text-sm">
                <div><div className="font-mono">{o.id}</div><div className="text-xs text-muted-foreground">{o.date}</div></div>
                <div className="font-semibold">{formatINR(o.total)}</div>
                <span className="rounded bg-muted px-2 py-0.5 text-xs">{o.status}</span>
                <Link to="/orders" className="text-sm text-primary">View</Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
});
