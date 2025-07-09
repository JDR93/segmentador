"use client";

import ButtonLoadMore from "@/components/ButtonLoadMore";
import Filter from "@/components/Filter";
import ResultsSummary from "@/components/ResultsSummary";
import SkeletonGrid from "@/components/SkeletonGrid";
import SupportCardsList from "@/components/SupportCardsList";
import { FilterContext } from "@/contexts/filterContext";
import { useEffect } from "react";
import { useContextSelector } from "use-context-selector";

export default function Home() {
  const isLoading = useContextSelector(FilterContext, (state) => state?.isLoading);

  useEffect(() => {
    const sendHeight = () => {
      const height = document.documentElement.scrollHeight;
      window.parent.postMessage({ type: "iframeHeight", height }, "*");
    };

    // Enviar al cargar y redimensionar
    window.addEventListener("load", sendHeight);
    window.addEventListener("resize", sendHeight);

    // Enviar cuando cambie el DOM
    const observer = new MutationObserver(sendHeight);
    observer.observe(document.body, { childList: true, subtree: true });

    // Enviar al hacer click (cambios dinámicos)
    document.addEventListener("click", () => setTimeout(sendHeight, 500));

    return () => {
      window.removeEventListener("load", sendHeight);
      window.removeEventListener("resize", sendHeight);
      observer.disconnect();
    };
  }, []);

  return (
    <section className="base animate__animated animate__fadeIn animate__faster">
      <header className="base-header">
      <h1 className="base-header-title">Explora nuestros apoyos financieros</h1>
        <p className="base-header-description">
        Hacer realidad tu proyecto educativo es nuestra prioridad. Con esta herramienta, te ayudamos a explorar becas, préstamos, descuentos y otras alternativas de financiación que se adaptan a tu perfil e intereses académicos. Una vez identifiques el apoyo que te interese, te invitamos a aplicar. Ten en cuenta que la asignación final de los apoyos se determinará tras un análisis detallado, después de iniciar tu proceso de solicitud.
        </p>
      </header>
      <main className="base-content  ">
        <section className="dropdown-filter-pattern">
          <header className="dropdown-filter-pattern-header">
            <Filter />
          </header>
        </section>

        {isLoading ? (
          <SkeletonGrid />
        ) : (
          <section className="results-block">
            <header className="results-block-header">
              <ResultsSummary />
            </header>
            <main className="results-block-main animate__animated animate__fadeIn">
              <SupportCardsList />
            </main>
            <footer className="results-block-footer">
              <ButtonLoadMore />
            </footer>
          </section>
        )}
      </main>
    </section>
  );
}
