import IpeAtualizar from "@/src/assets/icones/ipe-atualizar.svg"
import Image from "next/image";

export default function VendasPendentes() {
    return(
        <div className="flex bg-white w-72 h-28 rounded-xl items-center">
        <div className="flex p-3">
          <div className="bg-purple w-16 h-16 rounded-full flex justify-center">
            <Image src={IpeAtualizar} alt="IpePedidos" />
          </div>
          <div>
            <p className="ml-5 text-gray-400 text-base">Vendas Pendentes</p>
            <div className="ml-5 text-xl">22</div>
          </div>
        </div>
      </div>
    )
}