import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { Button } from "./../components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/advertisements")({
  component: () => {
    const ads = [
      { id: "ad1", name: "Festive Sale Banner", placement: "Home Hero", status: "Active", impressions: "284K" },
      { id: "ad2", name: "Electronics Promo", placement: "Category Page", status: "Active", impressions: "156K" },
      { id: "ad3", name: "Become a Seller", placement: "Footer", status: "Paused", impressions: "98K" },
      { id: "ad4", name: "App Download", placement: "Sidebar", status: "Active", impressions: "47K" },
    ];
    return (
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Advertisements</h1>
          <Button onClick={() => toast.success("New ad created")}><Plus className="mr-1 h-4 w-4" />New Ad</Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {ads.map((a) => (
            <div key={a.id} className="glass-card rounded-xl p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold">{a.name}</div>
                  <div className="text-xs text-muted-foreground">{a.placement}</div>
                </div>
                <span className={`rounded px-2 py-0.5 text-xs ${a.status === "Active" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}`}>{a.status}</span>
              </div>
              <div className="mt-3 text-sm text-muted-foreground">{a.impressions} impressions this month</div>
            </div>
          ))}
        </div>
      </div>
    );
  },
});
