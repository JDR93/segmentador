"use client";

import { FilterContext } from "@/contexts/filterContext";
import { useContextSelector } from "use-context-selector";

export default function ButtonLoadMore() {
  const loadMore = useContextSelector(FilterContext, (state) => state.loadMore);
  const pageSize = useContextSelector(FilterContext, (state) => state.pageSize);
  const loadedSupportsCount = useContextSelector(FilterContext, (state) => state.loadedSupportsCount);
  const isLoading = useContextSelector(FilterContext, (state) => state.isLoading);

  const shouldShowButton = !isLoading && loadedSupportsCount > pageSize;

  if (!shouldShowButton) return null;

  return (
    <button
      onClick={loadMore}
      className="transition-all ease-out duration-200 px-[2.5632rem] py-[0.688rem] font-semibold text-lg leading-5 tracking-[0.0419rem] border border-secondary-default-lightbg cursor-pointer hover:shadow-button"
    >
      Cargar Más
    </button>
  );
}
