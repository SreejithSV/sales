import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { Heart, MessageSquare, ShieldCheck, ShoppingCart, Star, Store, Truck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./../components/ui/button";
import { Badge } from "./../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./../components/ui/tabs";
import { ProductCard } from "./../components/marketplace/ProductCard";
import { getProduct, products, formatINR, getSeller } from "./../lib/demo-data";
import { useStore } from "./../lib/store";
import { useState } from "react";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return { product: p };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.title} — Bazaaro` },
      { name: "description", content: loaderData?.product.description.slice(0, 150) ?? "" },
      { property: "og:image", content: loaderData?.product.image ?? "" },
    ],
  }),
  notFoundComponent: () => <div className="container mx-auto p-12 text-center">Product not found.</div>,
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const wished = wishlist.some((w) => w.id === product.id);
  const seller = getSeller(product.sellerId);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 5);
  const [mainImg, setMainImg] = useState(product.image);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <div className="overflow-hidden rounded-2xl bg-muted">
            <img src={mainImg} alt={product.title} className="aspect-square w-full object-cover" />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {[product.image, `${product.image}?1`, `${product.image}?2`, `${product.image}?3`].map((img) => (
              <button key={img} onClick={() => setMainImg(img)} className={`overflow-hidden rounded-lg border-2 transition-colors ${mainImg === img ? "border-primary" : "border-transparent"}`}>
                <img src={img} alt="thumb" className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <Link to="/products" search={{ category: product.category } as never} className="text-xs uppercase tracking-wider text-primary">{product.category}</Link>
          <h1 className="mt-1 text-3xl font-bold leading-tight">{product.title}</h1>
          <div className="mt-2 flex items-center gap-3">
            <span className="flex items-center gap-1 rounded bg-success/15 px-2 py-0.5 text-sm font-medium text-success"><Star className="h-3.5 w-3.5 fill-current" />{product.rating.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">{product.reviews.toLocaleString()} reviews</span>
            {product.stock > 0 ? <Badge variant="outline" className="border-success/40 text-success">In stock</Badge> : <Badge variant="destructive">Out of stock</Badge>}
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-4xl font-bold">{formatINR(product.price)}</span>
            <span className="text-lg text-muted-foreground line-through">{formatINR(product.mrp)}</span>
            <span className="rounded-md bg-destructive/15 px-2 py-0.5 text-sm font-bold text-destructive">{Math.round((1 - product.price / product.mrp) * 100)}% off</span>
          </div>

          <p className="mt-4 text-muted-foreground">{product.description}</p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 text-sm">
            <Feature i={Truck} t="Free delivery" />
            <Feature i={ShieldCheck} t="1Y warranty" />
            <Feature i={Store} t="Easy returns" />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" className="gradient-accent text-accent-foreground shadow-glow" onClick={() => { addToCart(product); navigate({ to: "/checkout" }); }}>Buy Now</Button>
            <Button size="lg" variant="outline" onClick={() => { addToCart(product); toast.success("Added to cart"); }}><ShoppingCart className="mr-2 h-4 w-4" />Add to Cart</Button>
            <Button size="lg" variant="ghost" onClick={() => { toggleWishlist(product); toast(wished ? "Removed from wishlist" : "Added to wishlist"); }}>
              <Heart className={`mr-2 h-4 w-4 ${wished ? "fill-destructive text-destructive" : ""}`} />Wishlist
            </Button>
          </div>

          {seller && (
            <div className="glass-card mt-6 flex items-center gap-3 rounded-xl p-4">
              <img src={seller.image} alt={seller.name} className="h-12 w-12 rounded-full object-cover" />
              <div className="flex-1">
                <div className="text-sm font-semibold">{seller.name} {seller.verified && <ShieldCheck className="ml-1 inline h-3.5 w-3.5 text-primary" />}</div>
                <div className="text-xs text-muted-foreground">Rated {seller.rating.toFixed(1)} ★ · {seller.city} · since {seller.since}</div>
              </div>
              <Link to="/seller/$id" params={{ id: seller.id }}><Button variant="outline" size="sm">Visit Store</Button></Link>
              <Link to="/messages"><Button size="sm" variant="secondary"><MessageSquare className="mr-1 h-4 w-4" />Chat</Button></Link>
            </div>
          )}
        </div>
      </div>

      <Tabs defaultValue="desc" className="mt-12">
        <TabsList>
          <TabsTrigger value="desc">Description</TabsTrigger>
          <TabsTrigger value="specs">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
          <TabsTrigger value="video">Video</TabsTrigger>
        </TabsList>
        <TabsContent value="desc" className="glass-card mt-4 rounded-xl p-6">
          <p className="text-muted-foreground">{product.description} Lorem ipsum dolor sit amet consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus.</p>
        </TabsContent>
        <TabsContent value="specs" className="glass-card mt-4 rounded-xl p-6">
          <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k} className="flex justify-between border-b py-2"><dt className="text-muted-foreground">{k}</dt><dd className="font-medium">{String(v)}</dd></div>
            ))}
          </dl>
        </TabsContent>
        <TabsContent value="reviews" className="glass-card mt-4 space-y-4 rounded-xl p-6">
          {["Excellent product, exceeded expectations!", "Good value for the price.", "Fast delivery, well packaged.", "Solid build quality."].map((c, i) => (
            <div key={i} className="border-b pb-3 last:border-0">
              <div className="flex items-center gap-2"><span className="font-semibold">User {i + 1}</span><span className="flex text-accent">{[...Array(5 - (i % 2))].map((_, x) => (<Star key={x} className="h-3 w-3 fill-current" />))}</span></div>
              <p className="mt-1 text-sm text-muted-foreground">{c}</p>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="video" className="glass-card mt-4 rounded-xl p-6">
          <div className="aspect-video w-full rounded-lg bg-muted grid place-items-center text-muted-foreground">▶ Product Video Preview</div>
        </TabsContent>
      </Tabs>

      <section className="mt-12">
        <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {related.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}

function Feature({ i: I, t }: { i: any; t: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-2.5 text-xs">
      <I className="h-4 w-4 text-primary" />{t}
    </div>
  );
}
