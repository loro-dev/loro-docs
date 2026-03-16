import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/discord")({
  beforeLoad: () => {
    throw redirect({
      href: "https://discord.gg/tUsBSVfqzf",
      statusCode: 302,
    });
  },
  component: () => null,
});
