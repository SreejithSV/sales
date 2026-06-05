import { createFileRoute, Link } from "@tanstack/react-router";
import { categories } from "./../lib/demo-data";

export const Route = createFileRoute("/categories")({
  head: () => ({ meta: [{ title: "Categories — Bazaaro" }, { name: "description", content: "Browse all categories on Bazaaro." }] }),
  component: () => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">All Categories</h1>
      <p className="text-muted-foreground">Find what you love across 8 categories and 100+ subcategories.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => (
          <Link key={c.id} to="/products" search={{ category: c.id } as never} className="group glass-card overflow-hidden rounded-2xl">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img src={c.image} alt={c.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <div className="text-lg font-bold">{c.name}</div>
                <div className="text-xs opacity-80">{c.count.toLocaleString()} products</div>
              </div>
            </div>
            <div className="p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Subcategories</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {c.subcategories.map((s) => (
                  <span key={s} className="rounded-full bg-muted px-2.5 py-1 text-xs">{s}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  ),
});
