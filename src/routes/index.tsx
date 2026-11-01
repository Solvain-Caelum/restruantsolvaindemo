import { createFileRoute } from "@tanstack/react-router";
import { HomePage, SiteShell, pageHead } from "@/components/restaurant/site";
export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "An Experience Beyond Taste",
      "Discover AURELIA, a fictional fine dining restaurant. Explore the seasonal menu, signature dishes and elegant dining room.",
    ),
  component: Index,
});
function Index() {
  return (
    <SiteShell>
      <HomePage />
    </SiteShell>
  );
}
