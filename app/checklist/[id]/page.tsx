"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import ItemChecklist from "@/components/ItemChecklist";
import StatusBadge from "@/components/StatusBadge";
import { useFrota } from "@/context/FrotaContext";
import { secoesChecklist } from "@/data/checklistItens";
import type { Status } from "@/types";

const todosItens: string[] = secoesChecklist.flatMap((s) => s.itens);

function ChecklistForm() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { veiculos, carregado, salvarRevisao } = useFrota();

  // Todos começam OK; o motorista desmarca o que estiver reprovado
  const [marcados, setMarcados] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(todosItens.map((i) => [i, true]))
  );
  const [observacoes, setObservacoes] = useState("");
  const [foto, setFoto] = useState("");

  const veiculo = veiculos.find((v) => String(v.id) === id);
  const reprovados = todosItens.filter((i) => !marcados[i]);
  const statusResultado: Status = reprovados.length > 0 ? "Inapto" : "Apto";

  if (!carregado) return <p className="vazio">Carregando…</p>;

  if (!veiculo) {
    return (
      <>
        <p className="vazio">Veículo não encontrado.</p>
        <Link href="/" className="btn btn-secundario">Voltar à garagem</Link>
      </>
    );
  }

  function finalizar() {
    salvarRevisao(veiculo!, reprovados, observacoes.trim());
    alert("Checklist salvo!");
    router.push("/relatorios");
  }

  return (
    <>
      <Link href="/" className="voltar">← Garagem</Link>

      <section className="cabecalho-checklist">
        <span className="placa placa-grande">{veiculo.placa}</span>
        <div>
          <h1>{veiculo.modelo}</h1>
          <p className="subtitulo">Motorista: {veiculo.motorista}</p>
        </div>
      </section>

      <div className={`resultado resultado-${statusResultado.toLowerCase()}`} role="status">
        <span>
          {reprovados.length === 0
            ? "Todos os itens OK"
            : `${reprovados.length} ${reprovados.length === 1 ? "item reprovado" : "itens reprovados"}`}
        </span>
        <StatusBadge status={statusResultado} />
      </div>

      {secoesChecklist.map((secao) => (
        <fieldset key={secao.titulo} className="secao">
          <legend>{secao.titulo}</legend>
          {secao.itens.map((item) => (
            <ItemChecklist
              key={item}
              label={item}
              marcado={marcados[item]}
              onChange={(m) => setMarcados((prev) => ({ ...prev, [item]: m }))}
            />
          ))}
        </fieldset>
      ))}

      <div className="campo">
        <label htmlFor="obs">Observações</label>
        <textarea
          id="obs"
          rows={4}
          placeholder="Descreva qualquer problema encontrado"
          value={observacoes}
          onChange={(e) => setObservacoes(e.target.value)}
        />
      </div>

      <div className="campo">
        <label htmlFor="hodometro">Foto do hodômetro</label>
        <input
          id="hodometro"
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) => setFoto(e.target.files?.[0]?.name ?? "")}
        />
        {foto && <small>Arquivo selecionado: {foto}</small>}
      </div>

      <button type="button" className="btn btn-primario btn-bloco" onClick={finalizar}>
        Finalizar Revisão
      </button>
    </>
  );
}

export default function ChecklistPage() {
  return (
    <Suspense fallback={<p className="vazio">Carregando…</p>}>
      <ChecklistForm />
    </Suspense>
  );
}
