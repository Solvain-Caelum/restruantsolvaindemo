import { createFileRoute } from "@tanstack/react-router";
import { GalleryPage, SiteShell, pageHead } from "@/components/restaurant/site";
export const Route = createFileRoute("/gallery")({ head: () => pageHead("Gallery", "Browse AURELIA’s food photography, elegant interiors and dining moments."), component: Page });
function Page() { return <SiteShell><GalleryPage /></SiteShell>; }
