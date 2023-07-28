import IpeDinheiro from "@/src/assets/icones/ipe-dinheiro.svg";
import { api } from "@/src/service/FetchAxios";
import { valorFormatado } from "@/src/util/formatarValor";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Rendimento() {
  const [rendimento, setRendimento] = useState();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fazerRequisicao = async () => {
      try {
        const { data } = await api.get("rendimento", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRendimento(data.sum);
      } catch (error) {}
    };
    fazerRequisicao();
  }, [token]);

  return (
    <div className="flex bg-white w-72 h-28 rounded-xl items-center">
      <div className="flex p-3">
        <div className="bg-purple w-16 h-16 rounded-full flex justify-center">
          <Image src={IpeDinheiro} alt="IpePedidos" />
        </div>
        <div>
          <div className="ml-5 text-gray-400 text-base">Vendas Totais</div>
          <div className="ml-5 text-xl">
            {valorFormatado(Number(rendimento))}
          </div>
        </div>
      </div>
    </div>
  );
}
