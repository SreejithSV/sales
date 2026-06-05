import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "./../components/ui/badge";
import { Button } from "./../components/ui/button";

export const Route = createFileRoute("/admin/support")({
  component: () => {
    const tickets = [
      { id: "T-1024", user: "Aarav Sharma", subject: "Refund not received", status: "Open", priority: "High" },
      { id: "T-1023", user: "Diya Patel", subject: "Wrong item delivered", status: "In Progress", priority: "Medium" },
      { id: "T-1022", user: "Vihaan Singh", subject: "Account verification", status: "Resolved", priority: "Low" },
      { id: "T-1021", user: "Anaya Reddy", subject: "Cannot place order", status: "Open", priority: "High" },
      { id: "T-1020", user: "Kabir Mehta", subject: "Coupon not applying", status: "In Progress", priority: "Low" },
    ];
    return (
      <div>
        <h1 className="text-2xl font-bold">Support Tickets</h1>
        <div className="mt-4 space-y-3">
          {tickets.map((t) => (
            <div key={t.id} className="glass-card flex flex-wrap items-center gap-4 rounded-xl p-4">
              <span className="font-mono text-sm">{t.id}</span>
              <div className="flex-1 min-w-[200px]">
                <div className="font-semibold">{t.subject}</div>
                <div className="text-xs text-muted-foreground">by {t.user}</div>
              </div>
              <Badge variant="outline">{t.priority}</Badge>
              <Badge>{t.status}</Badge>
              <Button size="sm" variant="outline">View</Button>
            </div>
          ))}
        </div>
      </div>
    );
  },
});
