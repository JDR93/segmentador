"use client";

import { HeroUIProvider } from "@heroui/react";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}