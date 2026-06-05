import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/dashboard/settings")({
  component: () => (
    <div>
      <h1 className="text-2xl font-bold capitalize">settings</h1>
      <div className="glass-card mt-4 rounded-xl p-8 text-muted-foreground">
        Your settings section is ready. Detailed views and controls will appear here.
      </div>
    </div>
  ),
});
