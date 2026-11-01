import { createFileRoute } from "@tanstack/react-router";
import { MenuPage, SiteShell, pageHead } from "@/components/restaurant/site";
export const Route = createFileRoute("/menu")({
  head: () =>
    pageHead(
      "The Menu",
      "Explore AURELIA’s sample starters, main courses, desserts and beverages, with prices in Indian rupees.",
    ),
  component: Page,
});
function Page() {
  return (
    <SiteShell>
      <MenuPage />
    </SiteShell>
  );
}
