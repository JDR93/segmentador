"use client";

import { removeAccents } from "@/app/utils/utilities";

type CardType = {
  apoyoid: string;
  tipoDeApoyo: string;
  nombreDelApoyo: string;
  dirigidoA: string;
  tipoDeEstudiante: string;
  cubre: string;
  aplicaParaXProgramas: string;
  nivelAcadémico: string[];
  url: string;
};

export default function Card({ apoyo, tabIndex }: { apoyo: CardType; tabIndex: number }) {
  let apot = { color: "", code: "" };
  const tipo = removeAccents(apoyo.tipoDeApoyo).toUpperCase();
  if (tipo.includes("BECA")) {
    apot = { color: "beca", code: "e263" };
  } else if (tipo.includes("DESCUENTO")) {
    apot = { color: "descuento", code: "ead5" };
  } else if (tipo.includes("PRESTAMO") || tipo.includes("PRÉSTAMO")) {
    apot = { color: "prestamo", code: "f038" };
  } else if (tipo.includes("SOSTENIMIENTO")) {
    apot = { color: "sostenimiento", code: "f76e" };
  }

  let niveles = [];

  if(apoyo.nivelAcadémico.length === 1){
    niveles = apoyo.nivelAcadémico[0].split(" - ").map((n) => n.trim());
  }else {
    niveles = apoyo.nivelAcadémico;
  }
  

  return (
    <article tabIndex={tabIndex} className="card-container-main">
      <div className={`card-container ${apot.color} `} onClick={() => window.open(apoyo.url, "_blank")}>
        <header className="header-container ">
          <div className={`chip-financial-support-container ${apot.color}`}>
            <span className="mds md-20 gradn">{String.fromCharCode(parseInt(apot.code, 16))}</span>
            <span className="chip-financial-support-title">{apoyo.tipoDeApoyo}</span>
          </div>
          <main className="main-container">
            <h1 className="card-title">{apoyo.nombreDelApoyo}</h1>
            <p className="card-description">{apoyo.dirigidoA}</p>
          </main>
        </header>

        <section className="footer-container">
          <ul className="details-container">
            {apoyo.tipoDeEstudiante !== "" ? (
              <li className="detail-content">
                <span className="mds md-20 gradn">&#xe80c;</span>
                <span className="detail-title">{apoyo.tipoDeEstudiante}</span>
              </li>
            ) : null}
            {apoyo.cubre !== "" ? (
              <li className="detail-content">
                <span className="mds md-20 gradn">&#xeb58;</span>
                <span className="detail-title">{apoyo.cubre}</span>
              </li>
            ) : null}
            {apoyo.aplicaParaXProgramas !== "" ? (
              <li className="detail-content">
                <span className="mds md-20 gradn">&#xe0e0;</span>
                <span className="detail-title">{apoyo.aplicaParaXProgramas}</span>
              </li>
            ) : null}
          </ul>
          <div className="tag-container">
            {niveles.map((tag, index) => (
              <div key={index} className="tag-content">
                <span className="tag-title">{tag}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}