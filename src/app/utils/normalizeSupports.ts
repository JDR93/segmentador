/* eslint-disable @typescript-eslint/no-explicit-any */

import { SupportType } from "@/providers/types/FilterProviderTypes";

export default function normalizeSupports(supports: any[]): SupportType[] {
  return supports.map((support) => ({
    ...support,
    nivelAcadémico: Array.isArray(support.nivelAcadémico) ? support.nivelAcadémico.map((n: string) => n.trim()) : [],
    facultades: Array.isArray(support.facultades) ? support.facultades.map((f: string) => f.trim()) : [],
    programas: Array.isArray(support.programas) ? support.programas.map((p: string) => p.trim()) : [],
  }));
}
