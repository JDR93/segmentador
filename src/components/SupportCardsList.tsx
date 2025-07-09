"use client";

import Card from "@/components/Card";
import { FilterContext } from "@/contexts/filterContext";
import { useContextSelector } from "use-context-selector";

export default function SupportCardsList() {
  const filteredSupportsCurrentPage = useContextSelector(FilterContext, (state) => state?.filteredSupportsCurrentPage);

  return (
    <>
      {filteredSupportsCurrentPage &&
        filteredSupportsCurrentPage.map((support, index) => <Card tabIndex={index} key={index} apoyo={support}></Card>)}
    </>
  );
}
