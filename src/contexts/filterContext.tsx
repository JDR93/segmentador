import { FilterContextType } from "@/providers/types/FilterProviderTypes";
import { createContext } from "use-context-selector";

export const FilterContext = createContext<FilterContextType>({} as FilterContextType);

