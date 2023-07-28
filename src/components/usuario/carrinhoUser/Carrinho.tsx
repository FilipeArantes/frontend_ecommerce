import { useState } from "react";
import InformacoesModal from "./InformacoesModal";
import ItensModalIndividual from "./ItensModalIndividual";

type CarrinhoProps = {
  fechar: () => void;
};

export default function Carrinho({
  fechar,
}: CarrinhoProps) {
  return (
    <div>
      <span onClick={fechar}>X</span>
      <div className="flex flex-row justify-start gap-16 pl-6">
        <ItensModalIndividual />
        <div>
          <InformacoesModal fechar={fechar}/>
        </div>
      </div>
    </div>
  );
}
