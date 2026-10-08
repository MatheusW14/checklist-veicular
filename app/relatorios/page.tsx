"use client";

import { useFrota } from "@/context/FrotaContext";
import StatusBadge from "@/components/StatusBadge";

export default function RelatoriosPage() {
  const { veiculos, revisoes, restaurarDados } = useFrota();

  // KPIs calculados a partir dos dados
  const total = veiculos.length;
  const aptos = veiculos.filter((v) => v.status === "Apto").length;
  const inaptos = veiculos.filter((v) => v.status === "Inapto").length;
  const pendentes = veiculos.filter((v) => v.status === "Pendente").length;
  const pctApta = total > 0 ? Math.round((aptos / total) * 100) : 0;

  // Itens que mais reprovam (participação no total de reprovações)
  const contagem: Record<string, number> = {};
  revisoes.forEach((r) => r.reprovados.forEach((item) => (contagem[item] = (contagem[item] ?? 0) + 1)));
  const totalReprovacoes = Object.values(contagem).reduce((a, b) => a + b, 0);
  const ranking = Object.entries(contagem)
    .map(([item, qtd]) => ({ item, qtd, pct: Math.round((qtd / totalReprovacoes) * 100) }))
    .sort((a, b) => b.qtd - a.qtd);

  return (
    <>
      <div className="titulo-linha">
        <h1>Painel do Gestor</h1>
        <button type="button" className="btn btn-secundario" onClick={() => alert("Relatório exportado!")}>
          Exportar PDF
        </button>
      </div>

      <section className="kpis" aria-label="Indicadores da frota">
        <div className="kpi">
          <strong>{pctApta}%</strong>
          <span>da frota apta ({aptos} de {total})</span>
        </div>
        <div className="kpi kpi-inapto">
          <strong>{inaptos}</strong>
          <span>veículos inaptos hoje</span>
        </div>
        <div className="kpi kpi-pendente">
          <strong>{pendentes}</strong>
          <span>checklists pendentes</span>
        </div>
      </section>

      <h2>Histórico de Revisões de Hoje</h2>
      {revisoes.length === 0 ? (
        <p className="vazio">Nenhuma revisão feita hoje. Faça um checklist na garagem.</p>
      ) : (
        <div className="tabela-wrap">
          <table className="tabela">
            <thead>
              <tr>
                <th>Placa</th>
                <th>Motorista</th>
                <th>Horário</th>
                <th>Status</th>
                <th>Quem reprovou</th>
              </tr>
            </thead>
            <tbody>
              {revisoes.map((r) => (
                <tr key={r.veiculoId}>
                  <td><span className="placa placa-pequena">{r.placa}</span></td>
                  <td>{r.motorista}</td>
                  <td>{r.horario}</td>
                  <td><StatusBadge status={r.status} /></td>
                  <td>{r.reprovados.length > 0 ? r.reprovados.join(", ") : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2>Itens que mais reprovam</h2>
      {ranking.length === 0 ? (
        <p className="vazio">Nenhuma reprovação registrada hoje.</p>
      ) : (
        <div className="grafico">
          {ranking.map((r) => (
            <div className="barra-linha" key={r.item}>
              <span className="barra-nome">{r.item}</span>
              <div className="barra-trilho">
                <div className="barra-preenchida" style={{ width: `${r.pct}%` }} />
              </div>
              <span className="barra-pct">{r.pct}%</span>
            </div>
          ))}
        </div>
      )}
      <p className="nota">Percentual sobre o total de reprovações registradas hoje.</p>

      <button type="button" className="btn-link" onClick={restaurarDados}>
        Restaurar dados de exemplo
      </button>
    </>
  );
}
