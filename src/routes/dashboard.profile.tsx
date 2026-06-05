import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/dashboard/profile")({
  component: () => (
    <div>
      <h1 className="text-2xl font-bold capitalize">profile</h1>
      <div className="glass-card mt-4 rounded-xl p-8 text-muted-foreground">
        Your profile section is ready. Detailed views and controls will appear here.
      </div>
    </div>
  ),
});
