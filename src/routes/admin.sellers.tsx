import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Star } from "lucide-react";
import { Badge } from "./../components/ui/badge";
import { Button } from "./../components/ui/button";
import { sellers } from "./../lib/demo-data";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/sellers")({
  component: () => (
    <div>
      <h1 className="text-2xl font-bold">Seller Management</h1>
      <div className="mt-4 grid gap-3">
        {sellers.map((s) => (
          <div key={s.id} className="glass-card flex flex-wrap items-center gap-4 rounded-xl p-4">
            <img src={s.image} className="h-12 w-12 rounded-full object-cover" />
            <div className="flex-1 min-w-[160px]">
              <div className="flex items-center gap-1 font-semibold">{s.name}{s.verified && <ShieldCheck className="h-3.5 w-3.5 text-primary" />}</div>
              <div className="text-xs text-muted-foreground">{s.city} · {s.products} products · <Star className="inline h-3 w-3 fill-accent text-accent" /> {s.rating.toFixed(1)}</div>
            </div>
            <Badge variant={s.verified ? "outline" : "destructive"}>{s.verified ? "Verified" : "Pending"}</Badge>
            <div className="flex gap-1">
              <Button size="sm" variant="outline" onClick={() => toast.success("Approved")}>Approve</Button>
              <Button size="sm" variant="outline" onClick={() => toast.success("Verified")}>Verify</Button>
              <Button size="sm" variant="destructive" onClick={() => toast.error("Rejected")}>Reject</Button>
              <Button size="sm" variant="ghost" onClick={() => toast("Suspended")}>Suspend</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
});
