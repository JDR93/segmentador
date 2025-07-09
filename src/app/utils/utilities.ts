/* eslint-disable @typescript-eslint/no-explicit-any */
export function removeAccents(cadena: string): string {
  return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export const capitalizarTextoAvanzado = (texto: string) => {
  if (!texto) return "";

  const noCapitalizar = ["de", "y", "en", "la", "el", "del", "a"];

  return texto
    .toLowerCase()
    .split(" ")
    .map((palabra, index) =>
      index > 0 && noCapitalizar.includes(palabra) ? palabra : palabra.charAt(0).toUpperCase() + palabra.slice(1)
    )
    .join(" ");
};

export const saveDataToLocalStorage = (key: string, data: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

export const getDataFromLocalStorage = <T>(key: string): T | null => {
  if (typeof window !== "undefined") {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item) as T;
      } catch (error) {
        console.error("Error parsing localStorage data", error);
        return null;
      }
    }
  }
  return null;
};

