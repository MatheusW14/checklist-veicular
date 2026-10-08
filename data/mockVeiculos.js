// Dados mockados da frota (10 veículos)
export const veiculosMock = [
  { id: 1, placa: "QRT-4A21", modelo: "Fiat Strada", motorista: "João Silva", status: "Apto", ultimaRevisao: "07/10/2026" },
  { id: 2, placa: "BRA-2E19", modelo: "Toyota Hilux", motorista: "Carlos Mendes", status: "Inapto", ultimaRevisao: "07/10/2026" },
  { id: 3, placa: "FKL-8B45", modelo: "VW Saveiro", motorista: "Ana Paula", status: "Apto", ultimaRevisao: "07/10/2026" },
  { id: 4, placa: "GHJ-3C77", modelo: "Mercedes Sprinter", motorista: "Roberto Lima", status: "Pendente", ultimaRevisao: "06/10/2026" },
  { id: 5, placa: "MNB-6D08", modelo: "Hyundai HR", motorista: "Marcos Souza", status: "Inapto", ultimaRevisao: "07/10/2026" },
  { id: 6, placa: "PLK-1F92", modelo: "Chevrolet Onix", motorista: "Fernanda Costa", status: "Pendente", ultimaRevisao: "05/10/2026" },
  { id: 7, placa: "TRE-9G36", modelo: "Renault Master", motorista: "Paulo Ribeiro", status: "Inapto", ultimaRevisao: "07/10/2026" },
  { id: 8, placa: "WXC-5H64", modelo: "Fiat Ducato", motorista: "Luciana Alves", status: "Apto", ultimaRevisao: "07/10/2026" },
  { id: 9, placa: "ZAQ-7J13", modelo: "Fiat Fiorino", motorista: "Diego Martins", status: "Pendente", ultimaRevisao: "04/10/2026" },
  { id: 10, placa: "DSF-0K58", modelo: "Mitsubishi L200", motorista: "Beatriz Nunes", status: "Apto", ultimaRevisao: "06/10/2026" },
];

// Revisões já feitas hoje (alimentam a tabela e o gráfico de /relatorios)
export const revisoesMock = [
  { veiculoId: 1, placa: "QRT-4A21", motorista: "João Silva", horario: "06:50", status: "Apto", reprovados: [], observacoes: "" },
  { veiculoId: 2, placa: "BRA-2E19", motorista: "Carlos Mendes", horario: "07:05", status: "Inapto", reprovados: ["Freios", "Pneus"], observacoes: "Pedal de freio baixo." },
  { veiculoId: 3, placa: "FKL-8B45", motorista: "Ana Paula", horario: "07:20", status: "Apto", reprovados: [], observacoes: "" },
  { veiculoId: 5, placa: "MNB-6D08", motorista: "Marcos Souza", horario: "07:40", status: "Inapto", reprovados: ["Freios", "Extintor"], observacoes: "" },
  { veiculoId: 7, placa: "TRE-9G36", motorista: "Paulo Ribeiro", horario: "08:10", status: "Inapto", reprovados: ["Pneus", "Faróis"], observacoes: "Pneu dianteiro careca." },
  { veiculoId: 8, placa: "WXC-5H64", motorista: "Luciana Alves", horario: "08:25", status: "Apto", reprovados: [], observacoes: "" },
];
