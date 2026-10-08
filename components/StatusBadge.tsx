import type { Status } from "@/types";

const classes: Record<Status, string> = {
  Apto: "badge badge-apto",
  Inapto: "badge badge-inapto",
  Pendente: "badge badge-pendente",
};

export default function StatusBadge({ status }: { status: Status }) {
  return <span className={classes[status]}>{status}</span>;
}
