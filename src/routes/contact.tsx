import { createFileRoute } from "@tanstack/react-router";
import { ContactPage, SiteShell, pageHead } from "@/components/restaurant/site";
export const Route = createFileRoute("/contact")({ head: () => pageHead("Contact & Opening Hours", "Find sample contact details, opening hours and a demo reservation form for AURELIA Fine Dining."), component: Page });
function Page() { return <SiteShell><ContactPage /></SiteShell>; }
