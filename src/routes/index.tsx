import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import hero from "@/assets/hero.jpg";
import t1 from "@/assets/trainer1.jpg";
import t2 from "@/assets/trainer2.jpg";
import t3 from "@/assets/trainer3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Titan Fitness — Strength, Conditioning & Coaching" },
      { name: "description", content: "Titan Fitness is a local gym offering strength, conditioning, HIIT and mobility programmes with flexible memberships." },
      { property: "og:title", content: "Titan Fitness — Train Like a Titan" },
      { property: "og:description", content: "Training programmes, membership plans and expert coaches at your local gym." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  ["Programmes", "programmes"],
  ["Membership", "membership"],
  ["Trainers", "trainers"],
  ["Visit", "visit"],
] as const;

const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

function Button({ children, onClick, variant = "primary", type = "button" }: { children: ReactNode; onClick?: () => void; variant?: "primary" | "outline"; type?: "button" | "submit" }) {
  const base = "inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  const v = variant === "primary"
    ? "bg-primary text-primary-foreground shadow-glow hover:-translate-y-0.5 hover:brightness-110"
    : "border border-foreground/30 text-foreground hover:border-primary hover:text-primary";
  return <button type={type} onClick={onClick} className={`${base} ${v}`}>{children}</button>;
}

function Section({ id, eyebrow, title, intro, children }: { id: string; eyebrow: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-5 py-20 md:py-28">
      <div className="reveal mb-12 max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
        <h2 className="text-3xl uppercase md:text-5xl">{title}</h2>
        {intro && <p className="mt-4 text-lg text-muted-foreground">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

function Placeholder({ children }: { children: ReactNode }) {
  return <span className="rounded border border-dashed border-primary/50 px-1.5 text-primary/90">{children}</span>;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")), { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f(); window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  const nav = (id: string) => { setOpen(false); go(id); };
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open ? "border-b bg-background/90 backdrop-blur" : ""}`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <button onClick={() => nav("top")} className="font-display text-xl uppercase tracking-wide">
          Titan<span className="text-primary">.</span>Fitness
        </button>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map(([l, id]) => (
            <button key={id} onClick={() => nav(id)} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">{l}</button>
          ))}
          <Button onClick={() => nav("join")}>Join Now</Button>
        </nav>
        <button aria-label="Toggle menu" onClick={() => setOpen(!open)} className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden">
          <span className={`h-0.5 w-6 bg-foreground transition ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-foreground transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-foreground transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>
      {open && (
        <nav className="animate-rise flex flex-col gap-1 px-5 pb-6 md:hidden">
          {NAV.map(([l, id]) => (
            <button key={id} onClick={() => nav(id)} className="py-3 text-left text-lg font-medium">{l}</button>
          ))}
          <div className="pt-3"><Button onClick={() => nav("join")}>Join Now</Button></div>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-end overflow-hidden md:items-center">
      <img src={hero} alt="Athlete performing a deadlift" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover object-[70%_center]" />
      <div className="hero-fade absolute inset-0" />
      <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-32">
        <p className="animate-rise mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Strength · Conditioning · Coaching</p>
        <h1 className="animate-rise max-w-3xl text-5xl uppercase leading-[0.95] md:text-7xl lg:text-8xl" style={{ animationDelay: ".1s" }}>
          Build the <span className="text-primary">strongest</span> version of you.
        </h1>
        <p className="animate-rise mt-6 max-w-lg text-lg text-muted-foreground" style={{ animationDelay: ".2s" }}>
          Structured programmes, supportive coaches and a space built for serious training — whatever your starting point.
        </p>
        <div className="animate-rise mt-9 flex flex-wrap gap-4" style={{ animationDelay: ".3s" }}>
          <Button onClick={() => go("join")}>Join Now</Button>
          <Button variant="outline" onClick={() => go("membership")}>View Plans</Button>
        </div>
      </div>
    </section>
  );
}

const PROGRAMMES = [
  { n: "01", t: "Strength Training", d: "Progressive barbell and dumbbell programming to build muscle and lasting strength." },
  { n: "02", t: "HIIT Conditioning", d: "High-energy interval sessions to improve fitness, stamina and work capacity." },
  { n: "03", t: "Personal Coaching", d: "One-to-one sessions with a plan built around your goals and schedule." },
  { n: "04", t: "Mobility & Recovery", d: "Guided mobility and stretching to move better and train consistently." },
];
const BENEFITS = ["Beginner-friendly induction", "Free weights & racks", "Small group classes", "Flexible training hours"];

function Programmes() {
  return (
    <Section id="programmes" eyebrow="Training" title="Programmes built for results" intro="Choose a focus or combine them. Every programme scales to your level.">
      <div className="grid gap-5 sm:grid-cols-2">
        {PROGRAMMES.map((p, i) => (
          <article key={p.n} className="reveal group rounded-xl border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60" style={{ transitionDelay: `${i * 80}ms` }}>
            <span className="font-display text-sm text-primary">{p.n}</span>
            <h3 className="mt-4 text-2xl uppercase">{p.t}</h3>
            <p className="mt-3 text-muted-foreground">{p.d}</p>
          </article>
        ))}
      </div>
      <ul className="reveal mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((b) => (
          <li key={b} className="flex items-center gap-3 rounded-full border px-5 py-3 text-sm font-medium">
            <span className="h-2 w-2 rounded-full bg-primary" />{b}
          </li>
        ))}
      </ul>
    </Section>
  );
}

const PLANS = [
  { name: "Essential", price: "29", feats: ["Gym floor access", "Off-peak hours", "Free induction"], pop: false },
  { name: "Performance", price: "49", feats: ["24/7 gym access", "Unlimited classes", "Monthly programme review"], pop: true },
  { name: "Elite", price: "89", feats: ["Everything in Performance", "4 personal sessions / month", "Nutrition guidance"], pop: false },
];

function Membership() {
  return (
    <Section id="membership" eyebrow="Membership" title="Simple, honest pricing" intro="Placeholder prices shown per month — replace with your own rates.">
      <div className="grid gap-6 md:grid-cols-3">
        {PLANS.map((p) => (
          <div key={p.name} className={`reveal relative flex flex-col rounded-xl border p-8 ${p.pop ? "border-primary bg-card shadow-glow" : "bg-card/60"}`}>
            {p.pop && <span className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase text-primary-foreground">Most popular</span>}
            <h3 className="text-xl uppercase">{p.name}</h3>
            <p className="mt-5 flex items-end gap-1">
              <span className="font-display text-5xl">£{p.price}</span>
              <span className="pb-1.5 text-muted-foreground">/month</span>
            </p>
            <ul className="mt-6 flex-1 space-y-3">
              {p.feats.map((f) => (
                <li key={f} className="flex gap-3 text-muted-foreground"><span className="text-primary">✓</span>{f}</li>
              ))}
            </ul>
            <div className="mt-8">
              <Button variant={p.pop ? "primary" : "outline"} onClick={() => go("join")}>Enquire</Button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

const TRAINERS = [
  { img: t1, name: "Trainer Name", role: "Head Strength Coach" },
  { img: t2, name: "Trainer Name", role: "Conditioning Coach" },
  { img: t3, name: "Trainer Name", role: "Mobility & Yoga Coach" },
];

function Trainers() {
  return (
    <Section id="trainers" eyebrow="Our team" title="Meet the coaches" intro="Placeholder profiles — add your trainers' names, bios and qualifications.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TRAINERS.map((t) => (
          <figure key={t.role} className="reveal group overflow-hidden rounded-xl border bg-card">
            <div className="aspect-[4/5] overflow-hidden">
              <img src={t.img} alt={`${t.role} portrait`} loading="lazy" width={768} height={960} className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
            </div>
            <figcaption className="p-6">
              <h3 className="text-lg uppercase"><Placeholder>{t.name}</Placeholder></h3>
              <p className="mt-1 text-sm text-primary">{t.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

const HOURS = [["Mon – Fri", "06:00 – 22:00"], ["Saturday", "08:00 – 20:00"], ["Sunday", "08:00 – 18:00"]];

function Visit() {
  return (
    <Section id="visit" eyebrow="Visit us" title="Location & hours" intro="All details below are placeholders — replace with your real business information.">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="reveal rounded-xl border bg-card p-8">
          <h3 className="text-lg uppercase">Address</h3>
          <p className="mt-4 leading-relaxed text-muted-foreground"><Placeholder>123 Example Street</Placeholder><br /><Placeholder>Your Town, AB1 2CD</Placeholder></p>
        </div>
        <div className="reveal rounded-xl border bg-card p-8">
          <h3 className="text-lg uppercase">Opening hours</h3>
          <dl className="mt-4 space-y-2">
            {HOURS.map(([d, h]) => (
              <div key={d} className="flex justify-between gap-4 text-muted-foreground"><dt>{d}</dt><dd className="text-foreground">{h}</dd></div>
            ))}
          </dl>
          <p className="mt-3 text-xs text-muted-foreground">Placeholder hours</p>
        </div>
        <div className="reveal rounded-xl border bg-card p-8">
          <h3 className="text-lg uppercase">Contact</h3>
          <p className="mt-4 space-y-1 text-muted-foreground">
            <span className="block">Phone: <Placeholder>01234 567890</Placeholder></span>
            <span className="block">Email: <Placeholder>hello@example.com</Placeholder></span>
          </p>
        </div>
      </div>
    </Section>
  );
}

const inputCls = "w-full rounded-lg border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";

function Join() {
  const [sent, setSent] = useState(false);
  return (
    <Section id="join" eyebrow="Join Now" title="Start your journey" intro="Send an enquiry and the team will get back to you. No payment is taken online.">
      <div className="reveal rounded-2xl border bg-card p-6 md:p-10">
        {sent ? (
          <div className="py-10 text-center">
            <p className="font-display text-3xl uppercase text-primary">Thanks!</p>
            <p className="mt-3 text-muted-foreground">This is a demo form — connect it to your email or CRM to receive enquiries.</p>
            <div className="mt-6"><Button variant="outline" onClick={() => setSent(false)}>Send another</Button></div>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="grid gap-5 md:grid-cols-2">
            <input required name="name" placeholder="Full name" className={inputCls} />
            <input required type="email" name="email" placeholder="Email address" className={inputCls} />
            <input name="phone" type="tel" placeholder="Phone (optional)" className={inputCls} />
            <select name="plan" defaultValue="" className={inputCls}>
              <option value="" disabled>Interested in…</option>
              {PLANS.map((p) => <option key={p.name}>{p.name}</option>)}
              <option>Not sure yet</option>
            </select>
            <textarea name="message" rows={4} placeholder="Tell us about your goals" className={`${inputCls} md:col-span-2`} />
            <div className="md:col-span-2"><Button type="submit">Send enquiry</Button></div>
          </form>
        )}
      </div>
    </Section>
  );
}

const SOCIAL = [
  ["Instagram", "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6-1.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"],
  ["Facebook", "M14 9h3V5h-3c-2.8 0-4 1.7-4 4v2H7v4h3v7h4v-7h3l1-4h-4V9.5c0-.3.2-.5.5-.5z"],
  ["YouTube", "M22 8s-.2-1.7-.9-2.4c-.8-.9-1.8-.9-2.2-1C15.8 4.4 12 4.4 12 4.4s-3.8 0-6.9.2c-.4.1-1.4.1-2.2 1C2.2 6.3 2 8 2 8s-.2 2-.2 4v1.8c0 2 .2 4 .2 4s.2 1.7.9 2.4c.8.9 2 .9 2.4 1 1.8.2 6.7.2 6.7.2s3.8 0 6.9-.2c.4-.1 1.4-.1 2.2-1 .7-.7.9-2.4.9-2.4s.2-2 .2-4V12c0-2-.2-4-.2-4zM10 15.5v-7l6 3.5-6 3.5z"],
] as const;

function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl uppercase">Titan<span className="text-primary">.</span>Fitness</p>
          <p className="mt-2 text-sm text-muted-foreground">© {new Date().getFullYear()} Titan Fitness. Placeholder business — customise before launch.</p>
        </div>
        <div className="flex gap-3">
          {SOCIAL.map(([n, d]) => (
            <a key={n} href="#" onClick={(e) => e.preventDefault()} aria-label={`${n} (add your link)`} title={`${n} — replace with your profile link`}
              className="flex h-11 w-11 items-center justify-center rounded-full border transition hover:border-primary hover:text-primary">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d={d} /></svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function Index() {
  useReveal();
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Programmes />
        <Membership />
        <Trainers />
        <Visit />
        <Join />
      </main>
      <Footer />
    </>
  );
}
