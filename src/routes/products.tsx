import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "./../components/marketplace/ProductCard";
import { products, categories } from "./../lib/demo-data";
import { Button } from "./../components/ui/button";
import { Slider } from "./../components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./../components/ui/select";
import { Checkbox } from "./../components/ui/checkbox";
import { Label } from "./../components/ui/label";

type Search = { category?: string; q?: string };

export const Route = createFileRoute("/products")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: typeof s.category === "string" ? s.category : undefined,
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  head: () => ({ meta: [{ title: "All Products — Bazaaro" }, { name: "description", content: "Browse 50,000+ products across categories." }] }),
  component: ProductsPage,
});

function ProductsPage() {
  const { category, q } = Route.useSearch();
  const [selectedCats, setSelectedCats] = useState<string[]>(category ? [category] : []);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sort, setSort] = useState("popular");

  const filtered = useMemo(() => {
    let list = products.slice();
    if (selectedCats.length) list = list.filter((p) => selectedCats.includes(p.category));
    if (q) list = list.filter((p) => p.title.toLowerCase().includes(q.toLowerCase()));
    list = list.filter((p) => p.price <= maxPrice);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [selectedCats, q, maxPrice, sort]);

  const toggle = (id: string) => setSelectedCats((cur) => cur.includes(id) ? cur.filter((c) => c !== id) : [...cur, id]);

  return (
    <div className="container mx-auto grid gap-6 px-4 py-8 lg:grid-cols-[260px_1fr]">
      <aside className="glass-card h-fit space-y-6 rounded-xl p-5">
        <div>
          <h3 className="mb-3 text-sm font-semibold">Categories</h3>
          <div className="space-y-2">
            {categories.map((c) => (
              <div key={c.id} className="flex items-center gap-2">
                <Checkbox id={c.id} checked={selectedCats.includes(c.id)} onCheckedChange={() => toggle(c.id)} />
                <Label htmlFor={c.id} className="cursor-pointer text-sm">{c.name} <span className="text-muted-foreground">({c.count})</span></Label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-3 text-sm font-semibold">Max Price: ₹{maxPrice.toLocaleString()}</h3>
          <Slider value={[maxPrice]} max={100000} step={500} onValueChange={(v) => setMaxPrice(v[0])} />
        </div>
        <Button variant="outline" className="w-full" onClick={() => { setSelectedCats([]); setMaxPrice(100000); }}>Reset Filters</Button>
      </aside>

      <div>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">All Products</h1>
            <p className="text-sm text-muted-foreground">{filtered.length} results {q ? `for "${q}"` : ""}</p>
          </div>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="price-asc">Price: Low → High</SelectItem>
              <SelectItem value="price-desc">Price: High → Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {filtered.length === 0 ? (
          <div className="glass-card rounded-xl p-12 text-center text-muted-foreground">No products match your filters.</div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
