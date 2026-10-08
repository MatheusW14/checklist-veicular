interface Props {
  label: string;
  marcado: boolean;
  onChange: (marcado: boolean) => void;
}

export default function ItemChecklist({ label, marcado, onChange }: Props) {
  return (
    <label className={`item ${marcado ? "item-ok" : "item-reprovado"}`}>
      <input type="checkbox" checked={marcado} onChange={(e) => onChange(e.target.checked)} />
      <span className="item-label">{label}</span>
      <span className="item-estado">{marcado ? "OK" : "Reprovado"}</span>
    </label>
  );
}
