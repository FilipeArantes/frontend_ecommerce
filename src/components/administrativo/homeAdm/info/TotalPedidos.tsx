import IpePedidos from "@/src/assets/icones/ipe-emitir.svg";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { api } from "@/src/service/FetchAxios";

export default function TotalPedidos() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const fazerRequisicao = async () => {
      try {
        const { data } = await api.get("pedidoCount");
        setCount(data.count);
      } catch (erro) {}
    };

    fazerRequisicao();
  }, []);

  return (
    <div className="flex bg-white w-72 h-28 rounded-xl items-center">
      <div className="flex p-3">
        <div className="bg-purple w-16 h-16 rounded-full flex justify-center">
          <Image src={IpePedidos} alt="IpePedidos" />
        </div>
        <div>
          <p className="ml-5 text-gray-400 text-base">Total de Pedidos</p>
          <div className="ml-5 text-xl">{count}</div>
        </div>
      </div>
    </div>
  );
}
