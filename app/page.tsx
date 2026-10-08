"use client";

import { useState } from "react";
import CardVeiculo from "@/components/CardVeiculo";
import { useFrota } from "@/context/FrotaContext";

const normaliza = (s: string) => s.toLowerCase().replace(/[-\s]/g, "");

export default function GaragemPage() {
  const { veiculos } = useFrota();
  const [busca, setBusca] = useState("");

  // Contadores calculados a partir do array
  const aptos = veiculos.filter((v) => v.status === "Apto").length;
  const inaptos = veiculos.filter((v) => v.status === "Inapto").length;
  const pendentes = veiculos.filter((v) => v.status === "Pendente").length;

  // Filtro em tempo real por placa ou modelo
  const termo = normaliza(busca);
  const filtrados = veiculos.filter(
    (v) => normaliza(v.placa).includes(termo) || normaliza(v.modelo).includes(termo)
  );

  return (
    <>
      <h1>Garagem</h1>
      <p className="subtitulo">{veiculos.length} veículos na frota. Escolha um para fazer o checklist.</p>

      <section className="contadores" aria-label="Resumo da frota">
        <div className="contador contador-apto">
          <strong>{aptos}</strong>
          <span>Aptos</span>
        </div>
        <div className="contador contador-inapto">
          <strong>{inaptos}</strong>
          <span>Inaptos</span>
        </div>
        <div className="contador contador-pendente">
          <strong>{pendentes}</strong>
          <span>Pendentes</span>
        </div>
      </section>

      <input
        type="search"
        className="busca"
        placeholder="Buscar por placa ou modelo"
        aria-label="Buscar por placa ou modelo"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />

      {filtrados.length === 0 ? (
        <p className="vazio">Nenhum veículo encontrado para “{busca}”. Confira a placa ou o modelo.</p>
      ) : (
        <div className="grid">
          {filtrados.map((v) => (
            <CardVeiculo key={v.id} veiculo={v} />
          ))}
        </div>
      )}
    </>
  );
}
