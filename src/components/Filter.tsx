"use client";

import DropdownFilter from "@/components/DropdownFilter";
import { Button, Divider } from "@heroui/react";
import { FilterContext } from "@/contexts/filterContext";
import { useContextSelector } from "use-context-selector";
import facultadesJSON from "../app/services/facultades.json";
import FilterChipArea from "./FilterChipArea";
import DropdownSelect from "./DropdowSelect";
import { useState } from "react";

export default function Filter() {
  const resetFilter = useContextSelector(FilterContext, (state) => state?.resetFilter);
  const isDirty = useContextSelector(FilterContext, (state) => state?.isDirty);
  const facultades = facultadesJSON.map((facultad) => ({
    label: facultad.nombre_facultad,
    value: facultad.cod_facultad,
  }));

  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  return (
    <>
      <h1 className="dropdown-filter-pattern-header-title">Filtrar por</h1>
      <FilterChipArea />
      <Divider className="bg-[#BAB9B3]"></Divider>
      {/* Div pata tablet */}
      <div className="hidden md:flex md:flex-row gap-8 xl:hidden w-full">
        <div className="w-1/2 flex flex-col">
        <DropdownFilter
        id="tipoDeEstudiante"
        openDropdownId={openDropdownId}
        setOpenDropdownId={setOpenDropdownId}
        label="Tipo de Estudiante"
        options={[
          { label: "Nuevo", value: "Nuevo" },
          { label: "Antiguo", value: "Antiguo" },
        ]}
      />
       <DropdownFilter
        openDropdownId={openDropdownId}
        setOpenDropdownId={setOpenDropdownId}
        id="facultades"
        label="Facultad"
        options={facultades}
      />
      {(
        useContextSelector(FilterContext, (state) =>
          state?.filter.nivelAcadémico || state?.filter.programas
        ) && (
        <DropdownFilter
          openDropdownId={openDropdownId}
          setOpenDropdownId={setOpenDropdownId}
          id="nombreDelApoyo"
          label="¿Tienes hermanos en la Universidad?"
          options={[
            { label: "Si", value: "Si" },
            { label: "No", value: "No" },
          ]}
        />
      ))}
        </div>
        <div className="w-1/2 flex flex-col">
        <DropdownFilter
        id="nivelAcadémico"
        openDropdownId={openDropdownId}
        setOpenDropdownId={setOpenDropdownId}
        label="Nivel Académico"
        options={[
          { label: "Pregrado", value: "Pregrado" },
          { label: "Maestria", value: "Maestría" },
          { label: "Especialización", value: "Especialización" },
          { label: "Doctorado", value: "Doctorado" },
        ]}
      />
      <DropdownSelect
        id="programas"
        label="Programa"
        openDropdownId={openDropdownId}
        setOpenDropdownId={setOpenDropdownId}
      />
        </div>
      </div>
      <div className="flex flex-col md:hidden  xl:flex">
        <DropdownFilter
          id="tipoDeEstudiante"
          openDropdownId={openDropdownId}
          setOpenDropdownId={setOpenDropdownId}
          label="Tipo de Estudiante"
          options={[
            { label: "Nuevo", value: "Nuevo" },
            { label: "Antiguo", value: "Antiguo" },
          ]}
        />
        <DropdownFilter
          id="nivelAcadémico"
          openDropdownId={openDropdownId}
          setOpenDropdownId={setOpenDropdownId}
          label="Nivel Académico"
          options={[
            { label: "Pregrado", value: "Pregrado" },
            { label: "Maestria", value: "Maestría" },
            { label: "Especialización", value: "Especialización" },
            { label: "Doctorado", value: "Doctorado" },
          ]}
        />
        <DropdownFilter
          openDropdownId={openDropdownId}
          setOpenDropdownId={setOpenDropdownId}
          id="facultades"
          label="Facultad"
          options={facultades}
        />
        <DropdownSelect
          id="programas"
          label="Programa"
          openDropdownId={openDropdownId}
          setOpenDropdownId={setOpenDropdownId}
        />
        {(
        useContextSelector(FilterContext, (state) =>
          state?.filter.nivelAcadémico || state?.filter.programas
        ) && (
        <DropdownFilter
                  openDropdownId={openDropdownId}
                  setOpenDropdownId={setOpenDropdownId}
                  id="nombreDelApoyo"
                  label="¿Tienes hermanos en la Universidad?"
                  options={[
                    { label: "Si", value: "Si" },
                    { label: "No", value: "No" },
                  ]}
                />
            ))}
</div>
      <div className="flex justify-end">
        <Button
          className="dropdown-filter-pattern-header-button border-black border-[1px] rounded-none focus:border-2 hover:bg-[#BAB9B3] focus:bg-[#BAB9B3] hover:text-black focus:text-black w-full md:w-full  md:w-[176px] xl:w-full justify-between md:justify-center"
          variant="bordered"
          disableRipple={true}
          isDisabled={!isDirty}
          startContent={<span className="mds md-20 gradn flex p-0">&#xe6d0;</span>}
          onPress={() => {
            resetFilter();
          }}
        >
          <span className="dropdown-filter-title">Limpiar</span>
        </Button>
      </div>
    </>
  );
}
