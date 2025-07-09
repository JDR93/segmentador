import { FilterType } from "@/providers/types/FilterProviderTypes";

type Support = {
  [key: string]: string | string[];
};

type Filters = {
  [K in keyof Support]?: boolean;
};

type CountValues = {
  [value: string]: number;
};

export type Result = {
  [K in keyof Filters]: K extends "nombreDelApoyo" ? { Si: number; No: number } : CountValues;
};

export default function countFilteredFieldValues(data: Support[], filter: FilterType): Result {
  const result = {} as Result;

  for (const key in filter) {
    // Inicialización del campo nombreDelApoyo en el resultado
    result[key] = key === "nombreDelApoyo" ? { Si: 0, No: 0 } : {};

    for (const item of data) {
      const field = item[key];

      if (key === "nombreDelApoyo") {
        // Contar si contiene "hermanos"
        const contieneHermanos = typeof field === "string" && field.toLowerCase().includes("hermanos");
        (result[key] as { Si: number; No: number })[contieneHermanos ? "Si" : "No"]++;
      } else if (key === "tipoDeEstudiante") {
        const tipo = String(field).toLowerCase().trim();
        const filtro = String(filter[key]).toLowerCase();

        const incluyeAntiguo = tipo.includes("antiguo");
        const incluyeNuevo = tipo.includes("nuevo");
        const incluyeAmbos = tipo.includes("nuevo y antiguo");

        const shouldCount = (label: "Antiguo" | "Nuevo") => {
          if (filtro === "nuevo") return (label === "Nuevo" && incluyeNuevo) || incluyeAmbos;
          if (filtro === "antiguo") return (label === "Antiguo" && incluyeAntiguo) || incluyeAmbos;
          return (label === "Antiguo" && incluyeAntiguo) || (label === "Nuevo" && incluyeNuevo);
        };

        ["Antiguo", "Nuevo"].forEach((label) => {
          const resultKey = result[key] as CountValues;

          resultKey[label] = shouldCount(label as "Antiguo" | "Nuevo")
            ? (resultKey[label] ?? 0) + 1
            : resultKey[label] ?? 0;
        });
      } else if (key === "nivelAcadémico") {
        const resultKey = result[key] as CountValues;

        if (typeof field === "string") {
          const niveles = field[0].split(" - ").map((n) => n.trim());
          niveles.forEach((value) => {
            resultKey[value] = (resultKey[value] ?? 0) + 1;
          });
        } else {
          field.forEach((value) => {
            resultKey[value] = (resultKey[value] ?? 0) + 1;
          });
        }
      } else {
        const resultKey = result[key] as CountValues;

        if (Array.isArray(field)) {
          field.forEach((value) => {
            resultKey[value] = (resultKey[value] ?? 0) + 1;
          });
        } else if (typeof field === "string") {
          resultKey[field] = (resultKey[field] ?? 0) + 1;
        }
      }
    }
  }
  return result;
}