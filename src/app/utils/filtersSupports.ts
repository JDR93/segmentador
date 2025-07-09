import { FilterType, SupportType } from "@/providers/types/FilterProviderTypes";

export default function filterSupports(supports: SupportType[], filters: FilterType): SupportType[] {
  const result = supports.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      if (key === "nombreDelApoyo") {
        const nombreApoyo = item.nombreDelApoyo.toLowerCase();
        return value.toLowerCase() === "no"
          ? !nombreApoyo.includes("hermanos") // Excluir si es "no"
          : true; // No filtrar si es "sí"
      } else if (key === "nivelAcadémico") {
        if(item.nivelAcadémico.length  === 1){
          const niveles = item.nivelAcadémico[0].split(" - ").map((n) => n.trim());
          if (niveles.length === 0) return false;
          return niveles.some((v) => v.toLowerCase().trim() === value.toLowerCase().trim());
        }else if (item.nivelAcadémico.length > 1){
          const niveles = item.nivelAcadémico;
          if (niveles.length === 0) return false;
          return niveles.some((v) => v.toLowerCase().trim() === value.toLowerCase().trim());
        }

      }

      // PARA LOS DEMAS CASOS
      const field = item[key as keyof SupportType];
      if (Array.isArray(field)) {
        if (field.length === 0) return false;
        return field.some((v) => v.toLowerCase().trim() === value.toLowerCase().trim());
      }

      return String(field)
        .toLowerCase()
        .includes(value && value.toLowerCase());
    });
  });

  // PRIORIZAR LOS QUE TIENEN "HERMANOS" SI ES "SI"
  const shouldPrioritizeHermanos = filters.nombreDelApoyo?.toLowerCase() === "si";

  const sorted = shouldPrioritizeHermanos
    ? [...result].sort((a, b) => {
        const aHasHermanos = a.nombreDelApoyo.toLowerCase().includes("hermanos");
        const bHasHermanos = b.nombreDelApoyo.toLowerCase().includes("hermanos");
        return aHasHermanos === bHasHermanos ? 0 : aHasHermanos ? -1 : 1;
      })
    : result; // NO PRIORIZAR LOS QUE TIENEN "HERMANOS" SI ES "NO"
  return sorted;
}