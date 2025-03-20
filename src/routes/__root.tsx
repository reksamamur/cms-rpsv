import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/pb";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <Outlet />
        <Toaster richColors closeButton />
      </QueryClientProvider>
    </React.Fragment>
  );
}
