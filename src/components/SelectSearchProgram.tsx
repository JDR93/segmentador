/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FilterContext } from "@/contexts/filterContext";
import { useContextSelector } from "use-context-selector";
import { useEffect, useState } from "react";
import facultadesJSON from "../app/services/facultades.json";
import Select, { components } from "react-select";
import { capitalizarTextoAvanzado } from "@/app/utils/utilities";
import { Divider } from "@heroui/react";

export default function SelectSearchProgram() {
  const filter = useContextSelector(FilterContext, (state) => state?.filter);
  const setFilter = useContextSelector(FilterContext, (state) => state?.setFilter);

  const [programs, setPrograms] = useState<
    {
      label: string;
      value: string;
    }[]
  >(
    facultadesJSON.flatMap((facultad) =>
      facultad.programas.map((programa) => ({
        label: programa.nombre_programa,
        value: programa.cod_programa,
      }))
    )
  );

  useEffect(() => {
    let selectedPrograms: (typeof facultadesJSON)[0]["programas"] = [];

    // Caso 1: No hay ningún filtro → mostrar todos los programas
    if (
      (!filter.facultades || filter.facultades.length === 0) &&
      (!filter.nivelAcadémico || filter.nivelAcadémico.length === 0)
    ) {
      selectedPrograms = facultadesJSON.flatMap((facultad) => facultad.programas);
    } else {
      // Caso 2: Hay facultades seleccionadas → usar solo las seleccionadas
      if (filter.facultades && filter.facultades.length > 0) {
        const selectedFaculties = facultadesJSON.filter((facultad) =>
          filter.facultades?.includes(facultad.cod_facultad)
        );
        selectedPrograms = selectedFaculties.flatMap((facultad) => facultad.programas);
      } else {
        // No hay facultades pero sí nivel académico → usar todos los programas
        selectedPrograms = facultadesJSON.flatMap((facultad) => facultad.programas);
      }

      // Filtrado por nivel académico (si aplica)
      if (filter.nivelAcadémico && filter.nivelAcadémico.length > 0) {
        selectedPrograms = selectedPrograms.filter((programa) =>
          filter.nivelAcadémico!.includes(programa.nivel_academico)
        );
      }
    }

    // Convertir a opciones para el select
    const programs = selectedPrograms
      .map((program) => ({
        value: program.cod_programa,
        label: program.nombre_programa,
      }))
      .sort((a, b) => a.label.localeCompare(b.label, "es", { sensitivity: "base" }));

    setPrograms(programs);
  }, [filter]);

  const [searchInput, setSearchInput] = useState("");
  const [hasNoResults, setHasNoResults] = useState(false);

  useEffect(() => {
    if (searchInput) {
      const hasMatches = programs.some((option) => option.label.toLowerCase().includes(searchInput.toLowerCase()));
      setHasNoResults(!hasMatches);
    } else {
      setHasNoResults(false);
    }
  }, [searchInput, programs]);

  const handleInputChange = (inputValue: string, { action }: { action: string }) => {
    if (action === "input-change") {
      setSearchInput(inputValue);
    }
  };

  // const customNoOptionsMessage = ({ inputValue }) => {
  //   return `No se encontraron resultados para "${inputValue}"`;
  // };
  return (
    <>
      <Select
        placeholder="Search..."
        value={filter?.programas ? programs.find((option) => option.value === filter.programas) : null}
        options={programs}
        isClearable={true}
        onInputChange={handleInputChange}
        noOptionsMessage={() => null}
        formatOptionLabel={({ label }) => capitalizarTextoAvanzado(label)}
        onChange={(selectedOption) => setFilter((prev) => ({ ...prev, programas: selectedOption?.value }))}
        components={{
          DropdownIndicator: CustomDropdownIndicator,
          ClearIndicator: CustomClearIndicator,
          Option: CustomOption,
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary50: "#transparent",
            primary25: "transparent",
            primary: "#F33B42",
            neutral20: "#000000", // Este es el color del borde por defecto
            neutral30: "#000000",
          },
        })}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderWidth: state.hasValue ? "0 0 2px 0" : "2px",
            // borderColor: state.hasValue ? "#191916" : "#000000", // Siempre negro, incluso en focus
            borderColor: hasNoResults ? "#A9142F" : "#000000",
            boxShadow: "none", // Elimina el resplandor (shadow) al enfocar
            "&:hover": {
              // borderColor: "#000000", // Mantiene el borde negro al hacer hover
              borderColor: hasNoResults ? "#A9142F" : "#000000",
            },
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            marginTop: 0, // Elimina el margen superior del menú
            borderTop: "none",
            padding: "0px",
            position: "relative",
            top: "0px",
          }),
          option: (baseStyles, { isSelected }) => ({
            ...baseStyles,
            padding: "0px 0px",

            backgroundColor: isSelected
              ? "#4d4d4c" // Color si está seleccionado (opcional)
              : "white", // Fondo normal (puedes cambiarlo)
            color: isSelected ? "#FFFFFF" : "#000000", // Color del texto
            "&:hover": {
              // border: "2px solid #000000", // Borde negro al hacer hover
              backgroundColor: isSelected ? "#BAB9B2" : "#f5f5f2",
              color: isSelected ? "#000000" : "#000000",
              // Fondo blanco (sin cambio de color)
            },
            "&:focus": {
              border: "2px solid #000000", // Borde negro al hacer hover
            },
          }),
        }}
        className={`relative z-30`}
        menuPlacement="auto"
      />
      {hasNoResults && (
        <div className="text-left py-2 flex flex-row gap-2">
          <span className="mds md-20 text-[#A9142F] gradn">&#xe88e;</span>
          <div>
            <p className="text-[#A9142F] text-[12px] font-normal leading-[16px] tracking-[4%] ">
              No hay opciones que coincidan con tu búsqueda.
            </p>
            <p className="text-[#A9142F] text-[12px] font-normal leading-[16px] tracking-[4%] ">
              Intenta con otro término.
            </p>
          </div>
        </div>
      )}
    </>
  );
}

const CustomDropdownIndicator = ({ selectProps, ...props }: { selectProps: any }) => {
  return (
    <components.DropdownIndicator {...selectProps} {...props}>
      {selectProps.menuIsOpen ? (
        <span className="mds md-20 gradn">&#xe316;</span> // Icono cuando está abierto
      ) : (
        <span className="mds md-20 gradn">&#xe313;</span> // Icono cuando está cerrado
      )}
    </components.DropdownIndicator>
  );
};

const CustomClearIndicator = (props: any) => {
  return (
    <components.ClearIndicator {...props}>
      <span className="mds md-20 gradn">&#xe5cd;</span>
    </components.ClearIndicator>
  );
};

const CustomOption = (props: any) => {
  const countFieldValues = useContextSelector(FilterContext, (state) => state?.countFieldValues);
  const count = countFieldValues?.programas?.[props.value] || 0;
  if (count === 0) return null;

  return (
    <>
      <components.Option {...props}>
        <div className="flex flex-col group/option py-3 px-2 ">
          <div className="text-left flex flex-row justify-between items-center">
            {" "}
            {capitalizarTextoAvanzado(props.label)} ({countFieldValues?.programas[props.value] || 0}){" "}
            {props.isSelected && (
              <span className="mds md-20 text-white group-hover/option:text-black gradn">&#xe5ca;</span>
            )}
          </div>
        </div>

        <Divider className="bg-[#BAB9B3] w-[95%] mx-auto h-[1px]"></Divider>
      </components.Option>
      {/* <Divider className="bg-[#BAB9B3] w-[90%] mx-auto"></Divider> */}
    </>
  );
};
