import { valorFormatado } from "@/src/util/formatarValor";

type ValorTotalProps = {
  valor: number;
  frete: number;
  setValorTotal: (valor: string) => void;
};

export default function ValorTotal({
  valor,
  frete,
  setValorTotal,
}: ValorTotalProps) {
  const valorTotal = valor + frete;
  setValorTotal(String(valorTotal));

  return (
    <div className="flex flex-row justify-between">
      <p>Total:</p>
      <p>{valorFormatado(valorTotal)}</p>
    </div>
  );
}
