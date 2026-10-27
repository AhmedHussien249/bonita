import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

const PHONE = "+201020664995";

function ContactPopover() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
  }, []);

  useEffect(() => {
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, handleClickOutside]);

  return (
    <div ref={ref} className="relative">
      <button
        id="contact-toggle"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 text-left hover:text-blush-deep transition-colors"
      >
        <Phone className="size-5 shrink-0" />
        {PHONE}
        <ArrowRight className={`ml-auto size-4 transition-transform duration-200 ${open ? "rotate-90" : ""}`} />
      </button>

      {/* Dropdown options */}
      <div
        role="menu"
        className={`absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-md border border-border bg-card shadow-lg transition-all duration-200 origin-top ${
          open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Call */}
        <a
          role="menuitem"
          href={`tel:${PHONE}`}
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-accent hover:text-blush-deep transition-colors"
        >
          <Phone className="size-4 shrink-0" />
          <span>Call</span>
        </a>

        <div className="mx-4 border-t border-border" />

        {/* WhatsApp */}
        <a
          role="menuitem"
          href={`https://wa.me/${PHONE.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-accent transition-colors"
          style={{ color: "inherit" }}
        >
          {/* WhatsApp SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 shrink-0 text-[#25D366]">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

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

        <section id="visit" className="bg-background py-16 text-foreground sm:py-24">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:items-end lg:px-12">
            <div><p className="text-[11px] font-bold uppercase tracking-[0.22em] text-blush-deep">See you soon</p><h2 className="mt-4 max-w-[650px] font-display text-6xl font-semibold leading-[0.9] sm:text-8xl">Good food.<br /><em className="font-normal">Better mood.</em></h2></div>
            <div className="grid gap-5 border-t border-border pt-7 text-sm lg:ml-auto lg:w-full lg:max-w-[420px]">
              <a
                href="https://maps.google.com/?q=31.110114,30.948023"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Bonita location in maps"
                className="flex items-center gap-3 hover:text-blush-deep transition-colors"
              >
                <MapPin className="size-5 shrink-0" />
                Kafr El Sheikh — Area 51
                <ArrowRight className="ml-auto size-4" />
              </a>
              {/* Phone contact popover */}
              <ContactPopover />
              <div className="flex items-center gap-4 pt-1">
                <a href="https://www.facebook.com/bonita_corner.1" target="_blank" rel="noopener noreferrer" aria-label="Bonita on Facebook" className="text-muted-foreground hover:text-blush-deep transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
                </a>
                <a href="https://www.instagram.com/bonita_corner.1/" target="_blank" rel="noopener noreferrer" aria-label="Bonita on Instagram" className="text-muted-foreground hover:text-blush-deep transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-background px-6 pb-8 text-foreground sm:px-8 lg:px-12"><div className="mx-auto flex max-w-[1440px] flex-wrap items-end justify-between gap-6 border-t border-border pt-8"><div className="flex items-end gap-5"><Brand compact inverse /><span className="pb-1 text-[10px] uppercase tracking-[0.17em] text-muted-foreground">Taste it. Infinite.</span></div><a href="#top" className="text-[11px] font-bold uppercase tracking-[0.16em] hover:text-blush-deep">Back to top ↑</a></div></footer>
    </div>
  );
}
