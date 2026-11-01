import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Menu as MenuIcon,
  X,
  Instagram,
  Facebook,
  MapPin,
  Phone,
  Mail,
  Clock,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { format, startOfDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { validateReservation, demoReservationResult } from "@/lib/reservation";
import hero from "@/assets/aurelia-hero.jpg";
import interior from "@/assets/aurelia-interior.jpg";
import burrata from "@/assets/aurelia-burrata.jpg";
import risotto from "@/assets/aurelia-risotto.jpg";
import dessert from "@/assets/aurelia-dessert.jpg";
import drinks from "@/assets/aurelia-drinks.jpg";
import dishes from "@/assets/aurelia-dishes.jpg";

export const navItems = [
  { label: "Home", to: "/" },
  { label: "Menu", to: "/menu" },
  { label: "About", to: "/about" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
] as const;
export function pageHead(title: string, description: string) {
  return {
    meta: [
      { title: `${title} — AURELIA Fine Dining` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} — AURELIA Fine Dining` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}
export function Brand() {
  return (
    <span className="brand">
      <span>
        AURELIA<span className="text-primary">.</span>
      </span>
      <small>FINE DINING</small>
    </span>
  );
}
export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return (
    <>
      <header className="site-header">
        <div className="site-width flex h-24 items-center justify-between gap-6">
          <Link to="/" aria-label="Aurelia home">
            <Brand />
          </Link>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`nav-link ${pathname === item.to ? "active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild className="reservation-link hidden sm:inline-flex">
              <Link to="/reserve">
                Reserve a Table <ArrowUpRight />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <MenuIcon />}
            </Button>
          </div>
        </div>
        {open && (
          <nav className="mobile-nav site-width" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
            <Button asChild>
              <Link to="/reserve">
                Reserve a Table <ArrowUpRight />
              </Link>
            </Button>
          </nav>
        )}
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
}
function Footer() {
  const [social, setSocial] = useState("");
  return (
    <footer className="site-footer">
      <div className="site-width footer-grid">
        <div>
          <Link to="/" aria-label="Aurelia home">
            <Brand />
          </Link>
          <p className="mt-5 max-w-xs text-sm text-muted-foreground">
            Thoughtful food. Beautiful surroundings.
            <br />
            An evening to savour.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-5">DISCOVER</p>
          <div className="flex flex-col gap-3">
            {navItems.slice(1).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow mb-5">FIND US</p>
          <p className="text-sm leading-7 text-muted-foreground">
            [Restaurant street address]
            <br />
            [City, postal code]
            <br />
            [Restaurant phone number]
          </p>
          <small className="text-muted-foreground">Contact details awaiting replacement</small>
        </div>
        <div>
          <p className="eyebrow mb-5">STAY CONNECTED</p>
          <div className="flex gap-2">
            {[
              { name: "Instagram", icon: Instagram },
              { name: "Facebook", icon: Facebook },
            ].map(({ name, icon: Icon }) => (
              <Button
                key={name}
                variant="outline"
                size="icon"
                aria-label={name}
                title={`${name} profile not yet provided`}
                onClick={() =>
                  setSocial(
                    `${name} profile link has not been provided for this fictional restaurant.`,
                  )
                }
              >
                <Icon />
              </Button>
            ))}
          </div>
          {social && (
            <p role="status" className="mt-3 max-w-xs text-xs text-muted-foreground">
              {social}
            </p>
          )}
        </div>
      </div>
      <div className="site-width footer-bottom">
        <p>© {new Date().getFullYear()} AURELIA. All rights reserved.</p>
        <p>Fictional restaurant · Demo website</p>
      </div>
    </footer>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  copy,
  center = false,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  center?: boolean;
}) {
  return (
    <div className={`section-heading ${center ? "text-center mx-auto" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p className="section-copy">{copy}</p>}
    </div>
  );
}
export function HomePage() {
  return (
    <>
      <section className="restaurant-hero">
        <img
          src={hero}
          width={1920}
          height={1088}
          fetchPriority="high"
          alt="Golden sea bass with beurre blanc, herbs and a glass of wine"
        />
        <div className="hero-shade" />
        <div className="site-width hero-content">
          <p className="eyebrow hero-eyebrow">
            <span /> WELCOME TO AURELIA
          </p>
          <p className="hero-brand">
            AURELIA <span>— Fine Dining</span>
          </p>
          <h1>
            An Experience
            <br />
            Beyond <em>Taste.</em>
          </h1>
          <p className="hero-subtitle">Discover the art of fine dining.</p>
          <div className="flex flex-wrap gap-4">
            <Button asChild className="premium-button">
              <Link to="/menu">
                Explore Menu <ArrowUpRight />
              </Link>
            </Button>
            <Button asChild variant="outline" className="premium-button hero-outline">
              <Link to="/reserve">
                Reserve a Table <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
        <div className="hero-bottom site-width">
          <span>SEASONAL INGREDIENTS. TIMELESS CRAFT.</span>
          <Link to="/about">
            THE AURELIA EXPERIENCE <ArrowRight size={15} />
          </Link>
        </div>
      </section>
      <AboutSection />
      <section className="section-band border-y bg-secondary/40">
        <div className="site-width">
          <div className="section-top">
            <SectionHeading
              eyebrow="THE CHEF’S SELECTION"
              title="Signature expressions"
              copy="A few of our favourite flavours, thoughtfully brought together."
            />
            <Button asChild variant="link" className="px-0">
              <Link to="/menu">
                Discover the full menu <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="dish-grid">
            {signatureDishes.map((d) => (
              <DishCard key={d.name} dish={d} />
            ))}
          </div>
        </div>
      </section>
      <section className="section-band site-width">
        <div className="section-top">
          <SectionHeading
            eyebrow="A GLIMPSE INSIDE"
            title="More than a meal"
            copy="The plates, the place, the moments in between."
          />
          <Button asChild variant="link" className="px-0">
            <Link to="/gallery">
              View gallery <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="home-gallery">
          <img
            src={interior}
            width={1536}
            height={1024}
            loading="lazy"
            alt="Elegant Aurelia dining room with brass lighting"
          />
          <img
            src={dishes}
            width={1536}
            height={1024}
            loading="lazy"
            alt="A selection of starters, risotto and chocolate dessert"
          />
        </div>
      </section>
      <ReservationSection />
    </>
  );
}
export function AboutSection({ full = false }: { full?: boolean }) {
  return (
    <section className="site-width section-band about-grid">
      <div className="about-photo">
        <img
          src={interior}
          width={1536}
          height={1024}
          loading="lazy"
          alt="Intimate dining room with arched windows and golden pendant lights"
        />
        <span className="photo-caption">A SPACE TO SLOW DOWN & SAVOUR</span>
      </div>
      <div className="about-copy">
        <SectionHeading
          eyebrow="THE AURELIA PHILOSOPHY"
          title="Where every detail tells a story."
        />
        <p className="section-copy">
          At AURELIA, we imagine dining as an art of connection — between ingredients, people and
          the moments we share.
        </p>
        <p className="section-copy">
          Our menu pairs seasonal produce with considered technique. In a warm, intimate setting,
          familiar flavours find a new expression, and every course invites you to linger a little
          longer.
        </p>
        {full ? (
          <p className="section-copy">
            From the first welcome to the final sweet note, our vision is simple: an unhurried
            evening, beautifully composed.
          </p>
        ) : (
          <Button asChild variant="link" className="mt-6 px-0">
            <Link to="/about">
              Discover our story <ArrowRight />
            </Link>
          </Button>
        )}
        <div className="about-note">
          <span className="text-primary">✧</span>
          <p>
            Seasonal by nature.
            <br />
            Thoughtful by design.
          </p>
        </div>
      </div>
    </section>
  );
}
export type Dish = {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  tag?: string;
};
const menuDishes: Dish[] = [
  {
    name: "Heirloom Burrata",
    description: "Creamy burrata, heirloom tomatoes, basil and cold-pressed olive oil.",
    price: 650,
    category: "Starters",
    image: burrata,
    tag: "VEGETARIAN",
  },
  {
    name: "Wild Mushroom Risotto",
    description: "Arborio rice, forest mushrooms, shaved truffle and aged parmesan.",
    price: 950,
    category: "Main Course",
    image: risotto,
    tag: "CHEF’S FAVOURITE",
  },
  {
    name: "Pan-Seared Sea Bass",
    description: "Crisp sea bass, beurre blanc, seasonal greens and herb oil.",
    price: 1450,
    category: "Main Course",
    image: hero,
  },
  {
    name: "Chocolate & Raspberry",
    description: "Dark chocolate ganache, raspberry coulis and fresh berries.",
    price: 550,
    category: "Desserts",
    image: dessert,
  },
  {
    name: "Rosemary Citrus Spritz",
    description: "Bright citrus, fresh rosemary and sparkling soda. Alcohol-free.",
    price: 350,
    category: "Beverages",
    image: drinks,
  },
  {
    name: "Espresso",
    description: "A rich, aromatic single-origin espresso to finish your evening.",
    price: 220,
    category: "Beverages",
    image: drinks,
  },
];
const signatureDishes = [menuDishes[1], menuDishes[2], menuDishes[3]].filter((d): d is Dish =>
  Boolean(d),
);
function DishCard({ dish }: { dish: Dish }) {
  return (
    <article className="dish-card">
      <div className="dish-image">
        <img src={dish.image} alt={dish.name} loading="lazy" width={1024} height={1024} />
        {dish.tag && <span>{dish.tag}</span>}
      </div>
      <div className="dish-details">
        <div className="flex items-start justify-between gap-4">
          <h3>{dish.name}</h3>
          <span className="dish-price">₹{dish.price.toLocaleString("en-IN")}</span>
        </div>
        <p>{dish.description}</p>
      </div>
    </article>
  );
}
export function PageIntro({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <section className="page-intro site-width">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="section-copy">{copy}</p>
    </section>
  );
}
export function MenuPage() {
  const [category, setCategory] = useState("All");
  return (
    <>
      <PageIntro
        eyebrow="A TASTE OF AURELIA"
        title="The menu"
        copy="Seasonal inspiration. Considered ingredients. Beautifully balanced flavours."
      />
      <section className="site-width pb-24">
        <div className="category-tabs" role="tablist" aria-label="Menu categories">
          {["All", "Starters", "Main Course", "Desserts", "Beverages"].map((c) => (
            <Button
              key={c}
              role="tab"
              aria-selected={category === c}
              variant="ghost"
              onClick={() => setCategory(c)}
              className={category === c ? "selected" : ""}
            >
              {c}
            </Button>
          ))}
        </div>
        <div className="dish-grid" role="tabpanel" aria-label={category}>
          {menuDishes
            .filter((d) => category === "All" || d.category === category)
            .map((d) => (
              <DishCard key={d.name} dish={d} />
            ))}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Sample menu and prices in INR. Actual dishes, prices and dietary information are to be
          confirmed.
        </p>
      </section>
      <ReservationSection />
    </>
  );
}
const galleryImages = [
  { src: interior, title: "The dining room", type: "Interiors" },
  { src: hero, title: "Pan-seared sea bass", type: "Cuisine" },
  { src: burrata, title: "Heirloom burrata", type: "Cuisine" },
  { src: drinks, title: "A moment at the bar", type: "Moments" },
  { src: dessert, title: "A sweet finale", type: "Cuisine" },
  { src: dishes, title: "At the table", type: "Moments" },
];
export function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<number | null>(null);
  const filtered = galleryImages.filter((i) => filter === "All" || i.type === filter);
  const photo = selected === null ? undefined : filtered[selected];
  useEffect(() => {
    if (!photo) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [photo]);
  return (
    <>
      <PageIntro
        eyebrow="THE ART OF THE EVENING"
        title="A closer look"
        copy="A collection of flavours, spaces and little moments worth savouring."
      />
      <section className="site-width pb-24">
        <div className="category-tabs">
          {["All", "Cuisine", "Interiors", "Moments"].map((c) => (
            <Button
              key={c}
              variant="ghost"
              aria-pressed={filter === c}
              className={filter === c ? "selected" : ""}
              onClick={() => {
                setFilter(c);
                setSelected(null);
              }}
            >
              {c}
            </Button>
          ))}
        </div>
        <div className="gallery-grid">
          {filtered.map((i, n) => (
            <Button
              key={i.title}
              variant="ghost"
              className="gallery-item"
              aria-label={`View ${i.title}`}
              onClick={() => setSelected(n)}
            >
              <img src={i.src} alt={i.title} loading="lazy" width={1024} height={1024} />
              <span>
                {i.title}
                <ArrowUpRight />
              </span>
            </Button>
          ))}
        </div>
      </section>
      {photo && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={photo.title}
          onClick={() => setSelected(null)}
        >
          <Button
            autoFocus
            variant="outline"
            size="icon"
            className="lightbox-close"
            aria-label="Close photo"
            onClick={() => setSelected(null)}
          >
            <X />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              setSelected(((selected ?? 0) - 1 + filtered.length) % filtered.length);
            }}
          >
            <ChevronLeft />
          </Button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={photo.src} alt={photo.title} />
            <figcaption>{photo.title}</figcaption>
          </figure>
          <Button
            variant="outline"
            size="icon"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              setSelected(((selected ?? 0) + 1) % filtered.length);
            }}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </>
  );
}
export function ReservationSection() {
  const [date, setDate] = useState<Date>();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<{
    name: string;
    date: string;
    time: string;
    guests: number;
  }>();
  return (
    <section className="reservation-section">
      <div className="site-width reservation-grid">
        <div>
          <SectionHeading
            eyebrow="YOUR EVENING STARTS HERE"
            title="A seat at our table."
            copy="An intimate dinner, a special occasion, or simply an evening well spent."
          />
          <p className="demo-note">
            Demo reservation only. No real booking is made, and your details are not sent or stored.
          </p>
        </div>
        <div>
          {submitted ? (
            <div className="confirmation" role="status">
              <Check className="text-primary" size={32} />
              <h3>Thank you, {submitted.name}.</h3>
              <p>
                Your demo request for {submitted.guests} guests on {submitted.date} at{" "}
                {submitted.time} is complete.
              </p>
              <p className="demo-note">
                This is not a confirmed booking. No reservation was made and no information was
                saved.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSubmitted(undefined);
                  setDate(undefined);
                }}
              >
                Make another demo request <ArrowRight />
              </Button>
            </div>
          ) : (
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                const values = Object.fromEntries(new FormData(e.currentTarget));
                const result = validateReservation({
                  ...values,
                  date: date ? format(date, "yyyy-MM-dd") : "",
                });
                if (!result.success) {
                  const next: Record<string, string> = {};
                  result.error.issues.forEach((issue) => {
                    const key = String(issue.path[0]);
                    next[key] ??= issue.message;
                  });
                  setErrors(next);
                  return;
                }
                setErrors({});
                const outcome = demoReservationResult();
                if (outcome.demo && !outcome.booked)
                  setSubmitted({
                    ...result.data,
                    date: format(new Date(`${result.data.date}T12:00:00`), "d MMMM yyyy"),
                  });
              }}
              className="reservation-form"
            >
              <Field label="Full name" error={errors["name"]}>
                <input
                  name="name"
                  autoComplete="name"
                  maxLength={100}
                  placeholder="Your name"
                  aria-label="Full name"
                />
              </Field>
              <Field label="Email address" error={errors["email"]}>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  maxLength={255}
                  placeholder="you@example.com"
                  aria-label="Email address"
                />
              </Field>
              <Field label="Phone number" error={errors["phone"]}>
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  maxLength={20}
                  placeholder="+91"
                  aria-label="Phone number"
                />
              </Field>
              <Field label="Number of guests" error={errors["guests"]}>
                <select name="guests" defaultValue="2" aria-label="Number of guests">
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1} {i === 0 ? "guest" : "guests"}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Date" error={errors["date"]}>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="date-control"
                      aria-label="Select reservation date"
                    >
                      <CalendarDays />
                      {date ? format(date, "dd MMM yyyy") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => {
                        setDate(d);
                        setCalendarOpen(false);
                      }}
                      disabled={{ before: startOfDay(new Date()) }}
                    />
                  </PopoverContent>
                </Popover>
              </Field>
              <Field label="Time" error={errors["time"]}>
                <select name="time" defaultValue="" aria-label="Reservation time">
                  <option value="" disabled>
                    Select time
                  </option>
                  {[
                    "12:00",
                    "12:30",
                    "13:00",
                    "13:30",
                    "14:00",
                    "18:00",
                    "18:30",
                    "19:00",
                    "19:30",
                    "20:00",
                    "20:30",
                    "21:00",
                    "21:30",
                  ].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Button type="submit" className="premium-button col-span-full">
                Submit demo reservation <ArrowUpRight />
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div className="form-field">
      <label>{label}</label>
      {children}
      {error && (
        <p role="alert" className="text-destructive text-xs">
          {error}
        </p>
      )}
    </div>
  );
}
export function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="WE’D LOVE TO WELCOME YOU"
        title="Find your way to AURELIA"
        copy="A place for good company and memorable evenings."
      />
      <section className="site-width contact-grid pb-24">
        <div className="space-y-8">
          {[
            {
              icon: MapPin,
              title: "Our address",
              content: "[Restaurant street address]\n[City, postal code]",
            },
            { icon: Phone, title: "Call us", content: "[Restaurant phone number]" },
            { icon: Mail, title: "Write to us", content: "[Restaurant email address]" },
            {
              icon: Clock,
              title: "Opening hours · sample",
              content:
                "Tuesday – Sunday\nLunch 12:00 – 15:00\nDinner 18:00 – 22:00\nMonday · Closed",
            },
          ].map(({ icon: Icon, title, content }) => (
            <div key={title} className="flex gap-5">
              <Icon className="text-primary mt-1" size={20} />
              <div>
                <h2 className="font-sans text-base">{title}</h2>
                <p className="mt-2 whitespace-pre-line leading-7 text-muted-foreground">
                  {content}
                </p>
              </div>
            </div>
          ))}
          <p className="demo-note">
            All business details and hours are placeholders awaiting replacement.
          </p>
        </div>
        <div className="map-placeholder">
          <div className="map-lines" />
          <MapPin size={40} className="text-primary relative" />
          <h2 className="relative mt-5 text-2xl">AURELIA</h2>
          <p className="relative mt-3 text-sm text-muted-foreground">Google Maps placeholder</p>
          <p className="relative mt-2 text-xs text-muted-foreground">
            Location will appear when a real address is provided.
          </p>
        </div>
      </section>
      <ReservationSection />
    </>
  );
}
