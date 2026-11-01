import { createFileRoute } from "@tanstack/react-router";
import { AboutSection, PageIntro, ReservationSection, SiteShell, pageHead } from "@/components/restaurant/site";
export const Route = createFileRoute("/about")({ head: () => pageHead("Our Story", "Discover the culinary philosophy and intimate atmosphere imagined for AURELIA Fine Dining."), component: Page });
function Page() { return <SiteShell><PageIntro eyebrow="THE STORY BEHIND THE TABLE" title="Dining, thoughtfully composed." copy="A celebration of ingredients, craft and connection." /><AboutSection full /><ReservationSection /></SiteShell>; }
