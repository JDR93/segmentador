"use client";

import { FilterContext } from "@/contexts/filterContext";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import filterSupports from "@/app/utils/filtersSupports";
import countFilteredFieldValues, { Result } from "@/app/utils/countFilteredFieldValues";
import { FilterType, SupportType } from "./types/FilterProviderTypes";
import { fetchSupports } from "@/app/services/fetchSupports";
import { useLogin } from "@/contexts/loginContext";

const INITIAL_FILTER: FilterType = {
  programas: undefined,
  facultades: undefined,
  nivelAcadémico: undefined,
  tipoDeEstudiante: undefined,
  nombreDelApoyo: undefined,
};

export const INITIAL_PAGE_SIZE = 12;

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<FilterType>(INITIAL_FILTER);
  const [pageSize, setPageSize] = useState(INITIAL_PAGE_SIZE);
  const [countFieldValues, setCountFieldValues] = useState<Result>({});
  const [isLoading, setIsLoading] = useState(true);

  const { data: allSupports } = useQuery({
    queryKey: ["supports"],
    // queryFn: fetchSupports,
    queryFn: () => fetchSupports(),
    staleTime: Infinity, //esto evita cualquier refetch automatico
  });

  useEffect(() => {
    if (allSupports) {
      const initialResult = countFilteredFieldValues(allSupports, INITIAL_FILTER);
      setCountFieldValues(initialResult);
      setIsLoading(false);
    }
  }, [allSupports]);

  const filteredSupports = useMemo(() : SupportType[] => {
    if (!allSupports) return [];
    return filterSupports(allSupports, filter);
  }, [allSupports, filter]);

  const updateCountValues = async () => {
    if (filteredSupports) {
      const result = countFilteredFieldValues(filteredSupports, filter);
      setCountFieldValues(result);
      setIsLoading(false);
    }
  };

  const { mutate: handleCountAgain } = useMutation({
    mutationFn: updateCountValues,
    onMutate: () => console.log("Mutating..."),
  });


  const filteredSupportsCurrentPage = useMemo(() => {
    return filteredSupports.slice(0, pageSize)
  }, [filteredSupports, pageSize]);


  const loadedSupportsCount = filteredSupports.length;
  const pageCurrentSupportsCount = filteredSupportsCurrentPage.length;

  const isDirty = useMemo(() => {
    return Object.keys(filter).some((key) => filter[key as keyof FilterType] !== undefined);
  }, [filter]);

  const loadMore = useCallback(() => {
    setPageSize((prev) => prev + pageSize);
  }, [pageSize]);

  const resetFilter = useCallback(() => {
    setFilter(INITIAL_FILTER);
    handleCountAgain();
    setPageSize(INITIAL_PAGE_SIZE);
  }, [handleCountAgain]);

  return (
    <FilterContext.Provider
      value={{
        filter,
        setFilter,
        pageSize,
        setPageSize,
        loadMore,
        resetFilter,
        isDirty,
        isLoading,
        filteredSupports,
        loadedSupportsCount,
        allSupports: allSupports || [],
        filteredSupportsCurrentPage,
        pageCurrentSupportsCount,
        countFieldValues,
        handleCountAgain,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
