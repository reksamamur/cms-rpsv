import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$canvasid/")({
  component: Preview,
});

function Preview() {
  return <main>Hello "/$canvasid/"!</main>;
}
