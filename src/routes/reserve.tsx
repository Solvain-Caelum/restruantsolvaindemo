import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, ReservationSection, SiteShell, pageHead } from "@/components/restaurant/site";
export const Route = createFileRoute("/reserve")({ head: () => pageHead("Reserve a Table", "Try AURELIA’s demo reservation form. This demonstration does not make a real booking or save your details."), component: Page });
function Page() { return <SiteShell><PageIntro eyebrow="AN EVENING TO SAVOUR" title="Reserve a table" copy="Make time for something special." /><ReservationSection /></SiteShell>; }
