"use client";

import { useCallback, useRef, useState } from "react";
import { FilterContext } from "@/contexts/filterContext";
import { useContextSelector } from "use-context-selector";

interface DropdownProps {
  id: "programas" | "facultades" | "nivelAcadémico" | "tipoDeEstudiante" | "nombreDelApoyo";
  label: string;
  openDropdownId: string | null;
  setOpenDropdownId: (id: string | null) => void;
  children?: React.ReactNode;
}

export default function DropdownFilterPattern({
  id,
  label,
  openDropdownId,
  setOpenDropdownId,
  children,
}: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isOpen = openDropdownId === id;

  const onToggle = useCallback(() => {
    setOpenDropdownId(isOpen ? null : id);
  }, [isOpen, id, setOpenDropdownId]);

  const filter = useContextSelector(FilterContext, (state) => state?.filter);

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="relative inline-block dropdown-filter  ">
      <button
        type="button"
        onClick={onToggle}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className={`w-full px-3 py-2 flex justify-between items-center mt-1 text-sm focus:outline-none group/button
          border-b border-black hover:shadow-[0_1px_0_0_black] ${
            isOpen ? "border-transparent hover:shadow-none" : " hover:bg-gray-100"
          }`}
      >
        <span className="dropdown-filter-title">{label}</span>
        <div className="flex items-center gap-2">
          {filter[id] && (
            <div className="ypy-1 border-1 rounded-full w-[30px] h-[24px] flex items-center justify-center border-black group-hover/button:bg-[#BAB9B3]">
              <span className="text-xs line-clamp-3">1</span>
            </div>
          )}
          {!isOpen ? (
            <span className="mds md-20 gradn">&#xe145;</span>
          ) : (
            <span className="mds md-20 gradn">&#xe15b;</span>
          )}
        </div>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          // className="mt-2 w-full bg-white border-b-1 pb-4 overflow-auto group-hover/button:shadow-[0_1px_0_0_black]"
          className={`mt-2 w-full bg-white border-b-1 pb-4 overflow-auto ${
            isHovering ? "shadow-[0_1px_0_0_black]" : ""
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
