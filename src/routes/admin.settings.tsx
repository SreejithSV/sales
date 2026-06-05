import { createFileRoute } from "@tanstack/react-router";
import { Button } from "./../components/ui/button";
import { Input } from "./../components/ui/input";
import { Label } from "./../components/ui/label";
import { Switch } from "./../components/ui/switch";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  component: () => (
    <div>
      <h1 className="text-2xl font-bold">Platform Settings</h1>
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Settings saved"); }} className="glass-card mt-4 grid gap-4 rounded-xl p-5 sm:grid-cols-2">
        <div><Label>Platform Name</Label><Input defaultValue="Bazaaro" /></div>
        <div><Label>Support Email</Label><Input defaultValue="support@bazaaro.com" /></div>
        <div><Label>Commission %</Label><Input type="number" defaultValue={8} /></div>
        <div><Label>Currency</Label><Input defaultValue="INR" /></div>
        <div className="sm:col-span-2 flex items-center justify-between rounded-lg border p-4">
          <div><div className="font-medium">Allow new seller registrations</div><div className="text-xs text-muted-foreground">When off, registration is paused.</div></div>
          <Switch defaultChecked />
        </div>
        <div className="sm:col-span-2 flex items-center justify-between rounded-lg border p-4">
          <div><div className="font-medium">Maintenance mode</div><div className="text-xs text-muted-foreground">Show a maintenance page to visitors.</div></div>
          <Switch />
        </div>
        <div className="sm:col-span-2"><Button type="submit">Save Settings</Button></div>
      </form>
    </div>
  ),
});
