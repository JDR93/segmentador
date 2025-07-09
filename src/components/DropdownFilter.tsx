"use client";

import { capitalizarTextoAvanzado } from "@/app/utils/utilities";
import { FilterContext } from "@/contexts/filterContext";
import { useContextSelector } from "use-context-selector";
import DropdownFilterPattern from "./DropdownFilterPattern";
import { INITIAL_PAGE_SIZE } from "@/providers/FilterProvider";
import { cn } from "@heroui/react";

type Option = { label: string; value: string };

interface DropdownProps {
  id: "programas" | "facultades" | "nivelAcadémico" | "tipoDeEstudiante" | "nombreDelApoyo";
  label: string;
  options: Option[];
  openDropdownId: string | null;
  setOpenDropdownId: (id: string | null) => void;
}

export default function DropdownFilter({ id, label, options, openDropdownId, setOpenDropdownId }: DropdownProps) {
  const setFilter = useContextSelector(FilterContext, (state) => state?.setFilter);
  const filter = useContextSelector(FilterContext, (state) => state?.filter);
  const countFieldValues = useContextSelector(FilterContext, (state) => state?.countFieldValues);
  const setPageSize = useContextSelector(FilterContext, (state) => state?.setPageSize);
  const handleCountAgain = useContextSelector(FilterContext, (state) => state?.handleCountAgain);
  const isLoading = useContextSelector(FilterContext, (state) => state?.isLoading);

  const handleValueChange = (value: string) => {
    const newValue = filter?.[id] === value ? "" : value;
    setFilter?.((prev) => ({
      ...prev,
      [id]: newValue,
    }));

    handleCountAgain();
    setPageSize(INITIAL_PAGE_SIZE);
  };

  if (isLoading) return null;

  return (
    <DropdownFilterPattern id={id} label={label} openDropdownId={openDropdownId} setOpenDropdownId={setOpenDropdownId}>
      <ul className="p-2 space-y-5">
        <div className="space-y-3">
          {options.map((opt) => {
            const isSelected = filter?.[id] === opt.value;

            const count = countFieldValues?.[id]?.[opt.value] || 0;
            // Si el contador es 0, no renderizar la opción
            if (count === 0) return null;

            return (
              <div
                key={opt.value}
                onClick={() => handleValueChange(opt.value)}
                className={cn(
                  "inline-flex max-w-md w-full m-0 gap-[8px] items-center justify-start cursor-pointer group/base",
                  "hover:items-center p-2"
                )}
              >
                <div
                  className={cn(
                    "w-[18px] h-[18px] bg-white border-black border-1 flex items-center justify-center rounded-full",
                    "group-hover/base:shadow-[0px_0px_1px_3px_#E0DFDA] group-hover/base:bg-[#E0DFDA]",
                    !isSelected && "hover:bg-[#E0DFDA]"
                  )}
                >
                  <div
                    className={cn(
                      "w-[8px] h-[8px] rounded-full transition-opacity duration-200",
                      isSelected ? "bg-black opacity-100" : "opacity-0"
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "font-normal text-[14px] leading-4 tracking-[0%] text-[#1F1F1C] capitalize line-clamp-2"
                  )}
                >
                  {capitalizarTextoAvanzado(opt.label)} ({countFieldValues?.[id][opt.value] || 0})
                </span>
              </div>
            );
          })}
        </div>
      </ul>
    </DropdownFilterPattern>
  );
}
