import Link from "next/link";
import type { Veiculo } from "@/types";
import StatusBadge from "./StatusBadge";

export default function CardVeiculo({ veiculo }: { veiculo: Veiculo }) {
  return (
    <article className={`card card-${veiculo.status.toLowerCase()}`}>
      <div className="card-topo">
        <span className="placa">{veiculo.placa}</span>
        <StatusBadge status={veiculo.status} />
      </div>
      <h3 className="card-modelo">{veiculo.modelo}</h3>
      <dl className="card-info">
        <div>
          <dt>Motorista</dt>
          <dd>{veiculo.motorista}</dd>
        </div>
        <div>
          <dt>Última revisão</dt>
          <dd>{veiculo.ultimaRevisao}</dd>
        </div>
      </dl>
      <Link href={`/checklist/${veiculo.id}`} className="btn btn-primario">
        Iniciar Checklist
      </Link>
    </article>
  );
}
