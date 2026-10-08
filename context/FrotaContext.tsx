"use client";

import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { veiculosMock, revisoesMock } from "@/data/mockVeiculos";
import type { Veiculo, Revisao, Status } from "@/types";

const CHAVE = "frota:v1";

interface FrotaContextValue {
  veiculos: Veiculo[];
  revisoes: Revisao[];
  carregado: boolean;
  salvarRevisao: (veiculo: Veiculo, reprovados: string[], observacoes: string) => void;
  restaurarDados: () => void;
}

const FrotaContext = createContext<FrotaContextValue | null>(null);

export function FrotaProvider({ children }: { children: ReactNode }) {
  const [veiculos, setVeiculos] = useState<Veiculo[]>(veiculosMock as Veiculo[]);
  const [revisoes, setRevisoes] = useState<Revisao[]>(revisoesMock as Revisao[]);
  const [carregado, setCarregado] = useState(false);

  // Carrega do localStorage depois da montagem (evita erro de hidratação)
  useEffect(() => {
    try {
      const salvo = localStorage.getItem(CHAVE);
      if (salvo) {
        const dados = JSON.parse(salvo);
        setVeiculos(dados.veiculos);
        setRevisoes(dados.revisoes);
      }
    } catch {
      /* ignora dados corrompidos */
    }
    setCarregado(true);
  }, []);

  // Persiste a cada mudança
  useEffect(() => {
    if (!carregado) return;
    localStorage.setItem(CHAVE, JSON.stringify({ veiculos, revisoes }));
  }, [veiculos, revisoes, carregado]);

  const salvarRevisao = useCallback(
    (veiculo: Veiculo, reprovados: string[], observacoes: string) => {
      // Regra principal: qualquer item reprovado => Inapto
      const status: Status = reprovados.length > 0 ? "Inapto" : "Apto";
      const agora = new Date();
      const horario = agora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
      const hoje = agora.toLocaleDateString("pt-BR");

      setVeiculos((vs) =>
        vs.map((v) => (v.id === veiculo.id ? { ...v, status, ultimaRevisao: hoje } : v))
      );
      setRevisoes((rs) => [
        {
          veiculoId: veiculo.id,
          placa: veiculo.placa,
          motorista: veiculo.motorista,
          horario,
          status,
          reprovados,
          observacoes,
        },
        // uma revisão por veículo no dia: a nova substitui a anterior
        ...rs.filter((r) => r.veiculoId !== veiculo.id),
      ]);
    },
    []
  );

  const restaurarDados = useCallback(() => {
    setVeiculos(veiculosMock as Veiculo[]);
    setRevisoes(revisoesMock as Revisao[]);
  }, []);

  return (
    <FrotaContext.Provider value={{ veiculos, revisoes, carregado, salvarRevisao, restaurarDados }}>
      {children}
    </FrotaContext.Provider>
  );
}

export function useFrota() {
  const ctx = useContext(FrotaContext);
  if (!ctx) throw new Error("useFrota precisa estar dentro de <FrotaProvider>");
  return ctx;
}
