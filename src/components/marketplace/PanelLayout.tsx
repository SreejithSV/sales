import { Link, useRouterState, Outlet } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

export type NavItem = { to: string; label: string; icon: LucideIcon };

export function PanelLayout({ title, items, basePath }: { title: string; items: NavItem[]; basePath: string }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="container mx-auto grid gap-6 px-4 py-8 lg:grid-cols-[240px_1fr]">
      <aside className="glass-card h-fit rounded-xl p-3">
        <div className="px-3 pb-3 pt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</div>
        <nav className="flex flex-col gap-0.5">
          {items.map((it) => {
            const active = path === it.to || (it.to !== basePath && path.startsWith(it.to));
            return (
              <Link key={it.to} to={it.to} className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                <it.icon className="h-4 w-4" />{it.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
