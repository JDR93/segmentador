"use client";

import { FilterContext } from "@/contexts/filterContext";
import { Chip } from "@heroui/chip";
import { useContextSelector } from "use-context-selector";
import facultades from "@/app/services/facultades.json";
import { capitalizarTextoAvanzado } from "@/app/utils/utilities";
import { FilterType } from "@/providers/types/FilterProviderTypes";
import { INITIAL_PAGE_SIZE } from "@/providers/FilterProvider";

export default function FilterChipArea() {
  const isDirty = useContextSelector(FilterContext, (state) => state?.isDirty);
  const filter = useContextSelector(FilterContext, (state) => state?.filter);
  const setFilter = useContextSelector(FilterContext, (state) => state?.setFilter);
  const handleCountAgain = useContextSelector(FilterContext, (state) => state?.handleCountAgain);
  const setPageSize = useContextSelector(FilterContext, (state) => state?.setPageSize);

  if (!isDirty) {
    return null;
  }

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {/* Recorriendo los campos del filtro para crear los chips */}
      {Object.keys(filter).map((key) => {
        if (filter[key as keyof FilterType]) {
          return (
            <Chip
              key={key}
              className="dropdown-filter-chip pl-[4px] pr-[8px] border-[#1F1F1C] border-[1px] hover:bg-[#BAB9B3] cursor-pointer"
              variant="bordered"
              onClose={() => {
                setFilter({ ...filter, [key]: undefined });
                handleCountAgain();
                setPageSize(INITIAL_PAGE_SIZE);
              }}
              onClick={() => {
                setFilter({ ...filter, [key]: undefined });
                handleCountAgain();
                setPageSize(INITIAL_PAGE_SIZE);
              }}
              endContent={<span className="mds md-20 gradn flex p-0">&#xe5cd;</span>}
            >
              {key === "facultades" && getNombreFacultad(filter[key as keyof FilterType] as string)}
              {key === "programas" &&
                getNombrePrograma(filter[key as keyof FilterType] as string, filter.facultades ?? null)}
              {key !== "facultades" && key !== "programas" && (filter[key as keyof FilterType] as string)}
            </Chip>
          );
        }
        return null;
      })}
    </div>
  );
}

const getNombreFacultad = (codigo: string) => {
  const facultadEncontrada = facultades.find(
    (f: {
      cod_facultad: string;
      nombre_facultad: string;
      programas: { cod_programa: string; nombre_programa: string }[];
    }) => f.cod_facultad === codigo
  );
  return facultadEncontrada ? capitalizarTextoAvanzado(facultadEncontrada.nombre_facultad) : codigo;
};

const getNombrePrograma = (codigo: string, facultad: string | null) => {
  // Si tenemos facultad, buscamos solo en esa facultad
  if (facultad) {
    const facultadEncontrada = facultades.find((f) => f.cod_facultad === facultad);
    if (!facultadEncontrada) return codigo;

    const programaEncontrado = facultadEncontrada.programas.find((p) => p.cod_programa === codigo);
    return programaEncontrado ? capitalizarTextoAvanzado(programaEncontrado.nombre_programa) : codigo;
  }

  // Si no hay facultad, buscamos en todas las facultades
  for (const facultad of facultades) {
    const programaEncontrado = facultad.programas.find((p) => p.cod_programa === codigo);
    if (programaEncontrado) {
      return capitalizarTextoAvanzado(programaEncontrado.nombre_programa);
    }
  }

  return codigo; // Si no se encuentra en ninguna facultad
};
