import { api } from "@/src/service/FetchAxios";
import React, { useEffect, useState } from "react";

type VendasProps = {
  nome: string;
  preco: number;
  quantidade_estoque: number;
}

export default function VendasRecentes() {
  const [dados, setDados] = useState<VendasProps[]>([]);

  useEffect(() => {
    const fazerRequisicao = async () => {
      try {
        const resposta = await api.get("pedidosRecentes");
        const json = resposta.data;
        const primeirosDezItens = json.slice(0, 10);

        setDados(primeirosDezItens);
      } catch (erro) {
        console.error(erro);
      }
    };

    fazerRequisicao();
  }, []);

  return (
    <>
      <div className="rounded-xl bg-white mt-10 w-full h-criar mb-20">
        <p className="p-5">Vendas Recentes</p>
        <div className=" h-9 rounded-xl text-center bg-slate mx-5 px-2 mb-2 flex items-center justify-between">
          <p className="w-1/4">Produto</p>
          <p className="w-1/4">ID do produto</p>
          <p className="w-1/4">Valor</p>
          <p className="w-1/4">Status</p>
        </div>
        <div className="flex text-center flex-col">
          {dados?.map((item, index) => (
            <div key={index} className="px-2 mx-5 my-2 flex text-center items-center justify-between">
              <div className="w-1/4 flex items-center">
                <div className="bg-black h-10 rounded-lg w-16"></div>
                <p className="ml-2">{item.nome}</p>
              </div>
              <div className="w-1/4">
                <p>{item.id}</p>
              </div>
              <div className="w-1/4">
                <p>{item.preco}</p>
              </div>
              <div className="w-1/4">
                <p >{item.preco}</p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  );
}
