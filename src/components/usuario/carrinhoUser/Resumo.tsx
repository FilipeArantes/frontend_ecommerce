import { api } from "@/src/service/FetchAxios";
import { useEffect, useState, ChangeEvent } from "react";
import IpeEmitir from "@/src/assets/icones/ipe-emitir(1).svg";
import CalcularFrete from "./CEP/CalcularFrete";
import Image from "next/image";
import ValorProdutos from "./ValorProdutos";
import ValorTotal from "./ValorTotal";
import { valorFormatado } from "@/src/util/formatarValor";
import FinalizarCompraModal from "./FinalizarCompraModal";

export default function Resumo() {
  const [frete, setFrete] = useState("");
  const [valorProduto, setValorProduto] = useState("");
  const [valorTotal, setValorTotal] = useState("");

  return (
    <div>
      <div className="bg-white min-h-[27rem] min-w-[27.3rem] flex flex-col rounded-lg p-8">
        <CalcularFrete valorProduto={Number(valorProduto)} setValorFrete={setFrete} />
        <div className="flex items-center py-4 gap-5">
          <Image className="" src={IpeEmitir} alt="" width={20} />
          <div className="text-2xl">Resumo</div>
        </div>
        <div className="flex flex-col gap-5 mt-3">
          <ValorProdutos setValorProduto={setValorProduto} />
          <div className="flex flex-row justify-between">
            <div>Frete:</div>
            <div>{valorFormatado(Number(frete))}</div>
          </div>
          <ValorTotal
            valor={Number(valorProduto)}
            frete={Number(frete)}
            setValorTotal={setValorTotal}
          />
        </div>
        <div className="mt-10">
          <FinalizarCompraModal />
        </div>
      </div>
    </div>
  );
}
