import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Store } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./../components/ui/button";
import { Input } from "./../components/ui/input";
import { Label } from "./../components/ui/label";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Register — Bazaaro" }] }),
  component: () => {
    const nav = useNavigate();
    return (
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="flex items-center justify-center p-6">
          <form onSubmit={(e) => { e.preventDefault(); toast.success("Account created!"); nav({ to: "/" }); }} className="w-full max-w-sm space-y-4">
            <Link to="/" className="flex items-center gap-2"><Store className="h-6 w-6 text-primary" /><span className="text-xl font-bold">Bazaaro</span></Link>
            <div><h1 className="text-2xl font-bold">Create account</h1><p className="text-sm text-muted-foreground">Free forever. No card required.</p></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>First Name</Label><Input required /></div>
              <div><Label>Last Name</Label><Input required /></div>
            </div>
            <div><Label>Email</Label><Input type="email" required /></div>
            <div><Label>Password</Label><Input type="password" required /></div>
            <Button type="submit" className="w-full" size="lg">Create Account</Button>
            <p className="text-center text-sm text-muted-foreground">Have an account? <Link to="/login" className="text-primary">Login</Link></p>
          </form>
        </div>
        <div className="relative hidden lg:block gradient-accent">
          <div className="relative flex h-full flex-col justify-end p-12 text-accent-foreground">
            <h2 className="text-4xl font-bold">Join 1M+ shoppers.</h2>
            <p className="mt-2 max-w-md">Get early access to deals, exclusive seller drops, and faster checkout.</p>
          </div>
        </div>
      </div>
    );
  },
});
