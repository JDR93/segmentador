"use client";

import SelectSearchProgram from "./SelectSearchProgram";
import DropdownFilterPattern from "./DropdownFilterPattern";

interface DropdownProps {
  id: string;
  label: string;
  openDropdownId: string | null;
  setOpenDropdownId: (id: string | null) => void;
}

export default function DropdownFilter({ label, openDropdownId, setOpenDropdownId }: DropdownProps) {
  return (
    <DropdownFilterPattern
      id="programas"
      label={label}
      openDropdownId={openDropdownId}
      setOpenDropdownId={setOpenDropdownId}
    >
      <div className="px-[12px]">
      <p className="text-left font-normal text-[14px] leading-[16px] tracking-[8%] text-[#1F1F1C] mb-2">
        Busca el programa de tu interés
      </p>
      <SelectSearchProgram />
      </div>
    </DropdownFilterPattern>
  );
}
