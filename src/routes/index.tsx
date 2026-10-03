import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowRight, MapPin, Pause, Phone, Play, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sections, type MenuSection } from "@/lib/menu";
import videoAsset from "@/assets/bonita-video.mp4";
import webmAsset from "@/assets/bonita-video.webm";
import backgroundAsset from "@/assets/bonita-background.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bonita | Taste It. Infinite." },
      { name: "description", content: "Explore the Bonita menu: churros, toasted sandwiches, hot and cold drinks, desserts and signature creations. Discover every treat and its price in EGP." },
      { property: "og:title", content: "Bonita | Taste It. Infinite." },
      { property: "og:description", content: "Good food, better mood. Explore churros, coffee, desserts and signature creations on the Bonita menu." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const allLabel = "All menu";

function Brand({ compact = false, inverse = false }: { compact?: boolean; inverse?: boolean }) {
  return (
    <a href="#top" className={`inline-flex flex-col items-center leading-none ${inverse ? "text-foreground" : "text-primary"}`} aria-label="Bonita, back to top">
      <span className={compact ? "font-display text-4xl leading-4" : "font-display text-5xl leading-5"} aria-hidden="true">∞</span>
      <span className={`${compact ? "text-[22px]" : "text-[28px]"} font-display font-bold uppercase leading-none`}>Bonita</span>
    </a>
  );
}

function MenuBlock({ section, index }: { section: MenuSection; index: number }) {
  return (
    <section id={section.id} className="scroll-mt-32 border-t border-border py-12 sm:py-16 lg:py-20">
      <div className={`grid gap-9 lg:grid-cols-2 lg:items-start lg:gap-16`}>
        <div className={`relative overflow-hidden bg-secondary ${index % 2 === 1 ? "lg:order-2" : ""}`}>
          <img src={section.image} alt={section.imageAlt} loading="lazy" width={section.id === "signatures" ? 1536 : 1024} height="1024" className="aspect-[4/3] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]" />
          <span className="absolute bottom-4 left-4 bg-background px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-foreground sm:bottom-6 sm:left-6">Bonita / {section.kicker.split(" / ")[1]}</span>
        </div>
        <div className="lg:py-4">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-olive">{section.kicker}</p>
          <div className="flex items-end gap-3">
            <h2 className="font-display text-[clamp(3.5rem,6vw,6.5rem)] leading-[0.82] font-semibold">{section.title}</h2>
            <span className="mb-1 font-display text-3xl italic text-blush-deep">∞</span>
          </div>
          <p className="mt-5 mb-8 text-sm text-muted-foreground sm:text-base">{section.description}</p>
          <div className="border-t border-primary/40">
            {section.items.map((item) => (
              <div key={item.name} className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-b border-border/75 py-3.5 sm:py-4">
                <div className="min-w-0">
                  <h3 className="text-[14px] font-semibold leading-snug sm:text-[15px]">{item.name}</h3>
                  {item.description && <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.description}</p>}
                </div>
                <span className="shrink-0 pt-px text-sm font-semibold tabular-nums sm:text-[15px]">{item.price} <small className="text-[10px] font-medium text-muted-foreground">EGP</small></span>
              </div>
            ))}
          </div>
          {section.note && <div className="mt-5 border-l-2 border-blush-deep pl-4 text-xs leading-6 text-muted-foreground"><span className="font-bold text-foreground">A little extra</span><br />{section.note}</div>}
        </div>
      </div>
    </section>
  );
}

function Index() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = () => {
      if (preference.matches) video.pause();
      else void video.play().catch(() => setVideoPlaying(false));
    };
    syncPlayback();
    preference.addEventListener("change", syncPlayback);
    return () => preference.removeEventListener("change", syncPlayback);
  }, []);
  const [active, setActive] = useState(allLabel);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const visible = useMemo(() => sections
    .filter((section) => active === allLabel || section.title === active)
    .map((section) => ({ ...section, items: section.items.filter((item) => `${item.name} ${item.description ?? ""}`.toLowerCase().includes(query.trim().toLowerCase())) }))
    .filter((section) => section.items.length > 0), [active, query]);

  const selectCategory = (title: string) => {
    setActive(title);
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="top" className="bonita-site relative isolate min-h-screen overflow-x-hidden">
      <img src={backgroundAsset} alt="" aria-hidden="true" className="bonita-backdrop" />
      <div className="bonita-backdrop-overlay" aria-hidden="true" />
      <header className="relative z-20 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto grid h-[82px] max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:h-[96px] sm:px-8 lg:grid-cols-3 lg:px-12">
          <div className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-[0.16em] lg:flex"><a href="#menu" className="hover:text-olive">Explore menu</a><a href="#visit" className="hover:text-olive">Find us</a></div>
          <div className="justify-self-start lg:justify-self-center"><Brand /></div>
          <div className="flex items-center justify-end gap-3 sm:gap-5">
            <span className="hidden text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground sm:block">Taste it. Infinite.</span>
            <Button variant="ghost" size="icon" aria-label="Search menu" title="Search menu" onClick={() => { setSearchOpen(true); document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" }); }}><Search className="size-5" /></Button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative isolate flex min-h-[520px] items-end overflow-hidden bg-secondary sm:min-h-[620px] lg:min-h-[690px]">
          <video ref={videoRef} poster={backgroundAsset} muted loop playsInline preload="metadata" aria-label="Bonita background video" onPlay={() => setVideoPlaying(true)} onPause={() => setVideoPlaying(false)} className="absolute inset-0 -z-20 h-full w-full object-cover object-center"><source src={webmAsset} type="video/webm" /><source src={videoAsset} type="video/mp4" /></video>
          <div className="bonita-video-overlay absolute inset-0 -z-10" />
          <div className="mx-auto w-full max-w-[1440px] px-6 pb-14 text-foreground sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">
            <div className="max-w-[600px]">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.26em] sm:text-xs">Infinity of sweet moments & good vibes</p>
              <h1 className="font-display text-[clamp(5.4rem,12vw,11rem)] font-semibold leading-[0.71]">Bonita<span className="font-normal italic">.</span></h1>
              <p className="mt-6 font-display text-3xl italic sm:text-4xl">Taste it. Infinite.</p>
              <p className="mt-7 max-w-[380px] text-sm leading-7 text-foreground/90 sm:text-base">A little sweet, a little savory, and everything in between. Find your next favorite.</p>
              <a href="#menu" className="mt-8 inline-flex items-center gap-3 border-b border-primary pb-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:gap-5">Explore the menu <ArrowDown className="size-4" /></a>
            </div>
          </div>
          <div className="absolute right-5 top-5"><Button variant="outline" size="icon" aria-label={videoPlaying ? "Pause background video" : "Play background video"} title={videoPlaying ? "Pause background video" : "Play background video"} onClick={() => { const video = videoRef.current; if (!video) return; if (video.paused) void video.play().catch(() => setVideoPlaying(false)); else video.pause(); }}>{videoPlaying ? <Pause /> : <Play />}</Button></div>
          <div className="absolute bottom-5 right-5 hidden rotate-[-8deg] font-display text-2xl italic text-foreground sm:block lg:bottom-10 lg:right-12">Good food. Better mood. ♡</div>
        </section>

        <section id="menu" className="scroll-mt-0">
          <div className="border-b border-border bg-blush/15 paper-grain">
            <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-9 sm:px-8 sm:py-12 lg:px-12">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-olive">The menu / Bonita</p>
              <div className="flex flex-wrap items-end justify-between gap-4"><h2 className="font-display text-5xl font-semibold leading-none sm:text-7xl">Made to crave.</h2><span className="mb-1 font-display text-2xl italic text-muted-foreground sm:text-3xl">Something for every mood.</span></div>
            </div>
          </div>
          <div className="sticky top-0 z-10 border-b border-border bg-background/85 backdrop-blur-md">
            <div className="mx-auto flex max-w-[1440px] items-center gap-2 overflow-x-auto px-5 py-3.5 sm:px-8 lg:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {[allLabel, ...sections.map((s) => s.title)].map((title) => <Button key={title} variant={active === title ? "menuActive" : "menu"} size="sm" onClick={() => selectCategory(title)} className="h-9 shrink-0 px-4 text-xs font-semibold">{title}</Button>)}
              <div className="ml-auto flex shrink-0 items-center border-l border-border pl-2">
                <Button variant="ghost" size="icon" aria-label="Search menu" title="Search menu" onClick={() => setSearchOpen((open) => !open)}><Search className="size-4" /></Button>
              </div>
            </div>
            {searchOpen && <div className="mx-auto flex max-w-[1440px] items-center gap-3 border-t border-border px-5 py-3 sm:px-8 lg:px-12"><Search className="size-4 shrink-0 text-muted-foreground" /><input autoFocus type="search" aria-label="Search food and drinks" placeholder="Search food and drinks..." value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" /><Button variant="ghost" size="icon" aria-label="Close search" onClick={() => { setSearchOpen(false); setQuery(""); }}><X className="size-4" /></Button></div>}
          </div>
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
            {visible.length ? visible.map((section) => <MenuBlock key={section.id} section={section} index={sections.findIndex((s) => s.id === section.id)} />) : <div className="py-28 text-center"><p className="font-display text-4xl">No treats found.</p><p className="mt-3 text-sm text-muted-foreground">Try another search or browse the full menu.</p><Button variant="menu" className="mt-6" onClick={() => { setQuery(""); setActive(allLabel); }}>Show all menu</Button></div>}
          </div>
        </section>

        <section id="visit" className="bg-secondary/80 py-16 text-foreground sm:py-24">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:items-end lg:px-12">
            <div><p className="text-[11px] font-bold uppercase tracking-[0.22em] text-blush-deep">See you soon</p><h2 className="mt-4 max-w-[650px] font-display text-6xl font-semibold leading-[0.9] sm:text-8xl">Good food.<br /><em className="font-normal">Better mood.</em></h2></div>
            <div className="grid gap-5 border-t border-border pt-7 text-sm lg:ml-auto lg:w-full lg:max-w-[420px]"><div className="flex items-center gap-3"><MapPin className="size-5 shrink-0" />Area 51</div><a href="tel:01042484340" className="flex items-center gap-3 hover:text-blush-deep"><Phone className="size-5 shrink-0" />01042484340 <ArrowRight className="ml-auto size-4" /></a></div>
          </div>
        </section>
      </main>
      <footer className="bg-secondary/80 px-6 pb-8 text-foreground sm:px-8 lg:px-12"><div className="mx-auto flex max-w-[1440px] flex-wrap items-end justify-between gap-6 border-t border-border pt-8"><div className="flex items-end gap-5"><Brand compact inverse /><span className="pb-1 text-[10px] uppercase tracking-[0.17em] text-muted-foreground">Taste it. Infinite.</span></div><a href="#top" className="text-[11px] font-bold uppercase tracking-[0.16em] hover:text-blush-deep">Back to top ↑</a></div></footer>
    </div>
  );
}
