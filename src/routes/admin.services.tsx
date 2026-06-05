import { createFileRoute } from "@tanstack/react-router";
import { Button } from "./../components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { services, formatINR } from "./../lib/demo-data";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/services")({
  component: () => (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Services</h1>
        <Button onClick={() => toast.success("Service added")}><Plus className="mr-1 h-4 w-4" />Add Service</Button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <div key={s.id} className="glass-card overflow-hidden rounded-xl">
            <img src={s.image} className="h-32 w-full object-cover" />
            <div className="p-4">
              <div className="text-xs text-primary">{s.category}</div>
              <div className="font-semibold">{s.name}</div>
              <div className="text-sm text-muted-foreground">by {s.provider}</div>
              <div className="mt-2 flex items-center justify-between">
                <div className="font-bold">{formatINR(s.price)}</div>
                <div><Button size="icon" variant="ghost" className="h-8 w-8"><Edit className="h-4 w-4" /></Button><Button size="icon" variant="ghost" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
});
