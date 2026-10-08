export type Status = "Apto" | "Inapto" | "Pendente";

export interface Veiculo {
  id: number;
  placa: string;
  modelo: string;
  motorista: string;
  status: Status;
  ultimaRevisao: string;
}

export interface Revisao {
  veiculoId: number;
  placa: string;
  motorista: string;
  horario: string;
  status: Status;
  reprovados: string[];
  observacoes: string;
}
