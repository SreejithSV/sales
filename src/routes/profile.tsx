import { createFileRoute } from "@tanstack/react-router";
import { Button } from "./../components/ui/button";
import { Input } from "./../components/ui/input";
import { Label } from "./../components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Bazaaro" }] }),
  component: () => (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold">My Profile</h1>
      <div className="glass-card mt-6 flex items-center gap-4 rounded-xl p-5">
        <img src="https://i.pravatar.cc/100?u=demo" className="h-20 w-20 rounded-full" />
        <div>
          <div className="text-lg font-semibold">Aarav Sharma</div>
          <div className="text-sm text-muted-foreground">demo@bazaaro.com · Member since 2023</div>
        </div>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); toast.success("Profile updated"); }} className="glass-card mt-4 grid gap-4 rounded-xl p-5 sm:grid-cols-2">
        <div><Label>Full Name</Label><Input defaultValue="Aarav Sharma" /></div>
        <div><Label>Email</Label><Input defaultValue="demo@bazaaro.com" /></div>
        <div><Label>Phone</Label><Input defaultValue="+91 98765 43210" /></div>
        <div><Label>Date of Birth</Label><Input type="date" defaultValue="1995-03-15" /></div>
        <div className="sm:col-span-2"><Label>Address</Label><Input defaultValue="42, Park Avenue, Mumbai, 400001" /></div>
        <div className="sm:col-span-2"><Button type="submit">Save Changes</Button></div>
      </form>
    </div>
  ),
});
