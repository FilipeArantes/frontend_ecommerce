import { useState } from "react";
import InformacoesModal from "./InformacoesModal";
import ItensModalIndividual from "./ItensModalIndividual";

type ModalCarrinhoIndividualProps = {
  fechar: () => void;
};

export default function ModalCarrinhoIndividual({
  fechar,
}: ModalCarrinhoIndividualProps) {
  return (
    <div>
      <span onClick={fechar}>X</span>
      <div className="flex flex-row justify-start gap-16 pl-6">
        <ItensModalIndividual />
        <div>
          <InformacoesModal />
        </div>
      </div>
    </div>
  );
}
