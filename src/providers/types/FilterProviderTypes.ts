import { Result } from "@/app/utils/countFilteredFieldValues";

export type SupportType = {
    apoyoid: string;
    tipoDeApoyo: string;
    nombreDelApoyo: string;
    dirigidoA: string;
    tipoDeEstudiante: string;
    cubre: string;
    aplicaParaXProgramas: string;
    nivelAcadémico: string[];
    url: string;
    programas: string[];
    facultades: string[];
  };
  
  export type FilterType = {
    programas: undefined | string;
    facultades: undefined | string;
    nivelAcadémico: undefined | string;
    tipoDeEstudiante: undefined | string;
    nombreDelApoyo: undefined | string;
  };
  
  export type CountResult = {
    tipoDeEstudiante: Record<string, number>;
    nivelAcadémico: Record<string, number>;
    facultades: Record<string, number>;
    programas: Record<string, number>;
    total: number;
  };
  
  export type FilterContextType = {
    filter: FilterType;
    setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
    pageSize: number;
    setPageSize: React.Dispatch<React.SetStateAction<number>>;
    loadMore: () => void;
    loadedSupportsCount: number;
    resetFilter: () => void;
    isDirty: boolean;
    isLoading: boolean;
    filteredSupports: SupportType[];
    allSupports: SupportType[];
    countFieldValues: Result;
    handleCountAgain: () => void;
    filteredSupportsCurrentPage: SupportType[];
    pageCurrentSupportsCount : number;
  };