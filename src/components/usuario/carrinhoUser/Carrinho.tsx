import InformacoesModal from "./InformacoesModal";
import ItensModalIndividual from "./ItensModalIndividual";
import IpeClose from "@/src/assets/icones/ipe-close.svg";
import Image from "next/image";

type CarrinhoProps = {
  fechar: () => void;
};

export default function Carrinho({ fechar}: CarrinhoProps) {
  return (
    <div>
      <div className="flex justify-end">
        <span className="" onClick={fechar}>
          <Image src={IpeClose} alt="" />
        </span>
      </div>
      <div className="flex flex-row justify-start gap-16 ">
        <ItensModalIndividual />
        <div>
          <InformacoesModal fechar={fechar} />
        </div>
      </div>
    </div>
  );
}
