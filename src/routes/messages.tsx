import { createFileRoute } from "@tanstack/react-router";
import { Send } from "lucide-react";
import { useState } from "react";
import { Button } from "./../components/ui/button";
import { Input } from "./../components/ui/input";
import { messages } from "./../lib/demo-data";

export const Route = createFileRoute("/messages")({
  head: () => ({ meta: [{ title: "Messages — Bazaaro" }] }),
  component: () => {
    const [active, setActive] = useState(messages[0].id);
    const [text, setText] = useState("");
    const current = messages.find((m) => m.id === active)!;
    return (
      <div className="container mx-auto grid h-[calc(100vh-12rem)] gap-4 px-4 py-6 md:grid-cols-[300px_1fr]">
        <aside className="glass-card overflow-auto rounded-xl">
          <div className="border-b px-4 py-3 font-semibold">Conversations</div>
          {messages.map((m) => (
            <button key={m.id} onClick={() => setActive(m.id)} className={`flex w-full items-center gap-3 border-b p-3 text-left hover:bg-muted ${active === m.id ? "bg-muted" : ""}`}>
              <img src={m.avatar} className="h-10 w-10 rounded-full object-cover" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between"><span className="truncate text-sm font-medium">{m.from}</span><span className="text-[10px] text-muted-foreground">{m.time}</span></div>
                <div className="truncate text-xs text-muted-foreground">{m.preview}</div>
              </div>
              {m.unread > 0 && <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] text-primary-foreground">{m.unread}</span>}
            </button>
          ))}
        </aside>
        <section className="glass-card flex flex-col rounded-xl">
          <div className="flex items-center gap-3 border-b p-4">
            <img src={current.avatar} className="h-10 w-10 rounded-full object-cover" />
            <div><div className="font-semibold">{current.from}</div><div className="text-xs text-success">● Online</div></div>
          </div>
          <div className="flex-1 space-y-3 overflow-auto p-4">
            <Bubble side="them">Hi! How can I help you?</Bubble>
            <Bubble side="me">I'm interested in your latest product.</Bubble>
            <Bubble side="them">{current.preview}</Bubble>
            <Bubble side="me">Great, please share the link.</Bubble>
            <Bubble side="them">Sure, sending in a moment!</Bubble>
          </div>
          <form className="flex gap-2 border-t p-3" onSubmit={(e) => { e.preventDefault(); setText(""); }}>
            <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a message..." />
            <Button type="submit"><Send className="h-4 w-4" /></Button>
          </form>
        </section>
      </div>
    );
  },
});

function Bubble({ side, children }: { side: "me" | "them"; children: React.ReactNode }) {
  return (
    <div className={`flex ${side === "me" ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[70%] rounded-2xl px-3 py-2 text-sm ${side === "me" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>{children}</div>
    </div>
  );
}
