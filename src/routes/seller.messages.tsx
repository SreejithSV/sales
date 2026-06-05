import { createFileRoute } from "@tanstack/react-router";
import { messages } from "./../lib/demo-data";

export const Route = createFileRoute("/seller/messages")({
  component: () => (
    <div>
      <h1 className="text-2xl font-bold">Customer Messages</h1>
      <div className="glass-card mt-4 divide-y rounded-xl">
        {messages.map((m) => (
          <div key={m.id} className="flex items-center gap-3 p-4">
            <img src={m.avatar} className="h-10 w-10 rounded-full object-cover" />
            <div className="flex-1"><div className="font-semibold">{m.from}</div><div className="text-sm text-muted-foreground">{m.preview}</div></div>
            <div className="text-xs text-muted-foreground">{m.time}</div>
          </div>
        ))}
      </div>
    </div>
  ),
});
