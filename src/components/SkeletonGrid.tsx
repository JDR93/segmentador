import { Skeleton } from "@heroui/react";

export default function SkeletonGrid() {
  return (
    <section className="results-block w-full">
      <header className="results-block-header">
        <Skeleton className="h-5 w-[12.5rem] rounded-md bg-default-100" />
      </header>
      <main className="results-block-main">
        {[...Array(8)].map((_, index) => (
          <article key={index} className="card-container p-4 space-y-4">
            {/* Header con Chip y Título */}
            <header className="header-container space-y-3">
              {/* Chip de tipo de apoyo */}
              <div className="flex items-center gap-2">
                <Skeleton className="w-6 h-6 rounded-full bg-default-300" />
                <Skeleton className="h-4 w-32 rounded-md bg-default-200" />
              </div>

              {/* Título y descripción */}
              <main className="main-container space-y-2">
                <Skeleton className="h-5 w-3/4 rounded-md bg-default-200" />
                <Skeleton className="h-4 w-5/6 rounded-md bg-default-100" />
              </main>
            </header>

            {/* Footer con íconos y textos */}
            <section className="footer-container space-y-3">
              <ul className="details-container space-y-2">
                {[1, 2, 3].map((_, index) => (
                  <li key={index} className="detail-content flex items-center gap-2">
                    <Skeleton className="w-5 h-5 rounded-full bg-default-300" />
                    <Skeleton className="h-4 w-2/3 rounded-md bg-default-200" />
                  </li>
                ))}
              </ul>

              {/* Tag container */}
              <div className="tag-container">
                <div className="tag-content flex flex-wrap gap-2 mt-2">
                  {[1, 2].map((_, index) => (
                    <Skeleton key={index} className="h-6 w-16 rounded-full bg-default-300" />
                  ))}
                </div>
              </div>
            </section>
          </article>
        ))}
      </main>
    </section>
  );
}
