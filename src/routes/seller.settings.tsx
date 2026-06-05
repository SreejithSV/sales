import { createFileRoute } from "@tanstack/react-router";
import { Button } from "./../components/ui/button";
import { Input } from "./../components/ui/input";
import { Label } from "./../components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/seller/settings")({
  component: () => (
    <div>
      <h1 className="text-2xl font-bold">Store Settings</h1>
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Settings saved"); }} className="glass-card mt-4 grid gap-4 rounded-xl p-5 sm:grid-cols-2">
        <div><Label>Store Name</Label><Input defaultValue="TechHub India" /></div>
        <div><Label>Contact Email</Label><Input defaultValue="support@techhub.in" /></div>
        <div><Label>GSTIN</Label><Input defaultValue="27AABCT1234A1Z5" /></div>
        <div><Label>City</Label><Input defaultValue="Mumbai" /></div>
        <div className="sm:col-span-2"><Label>Pickup Address</Label><Input defaultValue="Plot 22, Industrial Area, Mumbai 400072" /></div>
        <div className="sm:col-span-2"><Button type="submit">Save</Button></div>
      </form>
    </div>
  ),
});
