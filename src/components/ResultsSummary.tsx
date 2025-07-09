"use client";

import { FilterContext } from "@/contexts/filterContext";
import { useContextSelector } from "use-context-selector";

export default function ResultsSummary() {
  const loadedSupportsCount = useContextSelector(FilterContext, (state) => state?.loadedSupportsCount);
  const pageCurrentSupportsCount = useContextSelector(FilterContext, (state) => state?.pageCurrentSupportsCount);
  const isLoading = useContextSelector(FilterContext, (state) => state?.isLoading);

  if (isLoading) return null;

  return (
    <span>
      mostrando <b>{pageCurrentSupportsCount}</b> de {loadedSupportsCount} resultados
    </span>
  );
}
