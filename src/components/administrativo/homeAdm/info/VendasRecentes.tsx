import { api } from "@/src/service/FetchAxios";
import { valorFormatado } from "@/src/util/formatarValor";
import Image from "next/image";
import React, { ReactNode, useEffect, useState } from "react";

type VendasProps = {
  nome_produto: string;
  preco_produto: number;
  quantidade_estoque: number;
  quantidade_comprada: number;
  dados: ReactNode;
};

interface DadosProduto {
  id: number;
  nome: string;
  status: boolean;
}

export default function VendasRecentes() {
  const [dados, setDados] = useState<VendasProps[]>([]);

  useEffect(() => {
    const fazerRequisicao = async () => {
      try {
        const resposta = await api.get("pedidosRecentes");
        const json = resposta.data;
        const primeirosDezItens = json.slice(0, 6);
        setDados(primeirosDezItens);
      } catch (erro) {
        console.error(erro);
      }
    };

    fazerRequisicao();
  }, []);

  return (
    <>
      <div className="rounded-xl bg-white mt-10 w-full flex flex-col mb-20">
        <div className="p-5">Vendas Recentes</div>
        <div className="flex h-9 rounded-xl text-center bg-slate mx-5 px-2 mb-2 items-center justify-between">
          <div className="w-1/4">Produto</div>
          <div className="w-1/4">ID do produto</div>
          <div className="w-1/4">Valor</div>
          <div className="w-1/4">Status</div>
        </div>
        <div className="flex text-center flex-col flex-wrap max-h-[22rem] ">
          {dados?.map((item, index) => (
            <div
              key={index}
              className="px-2 mx-5 my-2 flex text-center items-center justify-between"
            >
              <div className="w-1/4 flex items-center">
                <div className="bg-slate h-10 flex items-center rounded-lg w-16 object-contain">
                  <Image
                    src={item.dados?.imagem}
                    className="rounded-lg"
                    alt=""
                    width={62}
                    height={0}
                  />
                </div>
                <div className="flex flex-col items-start ml-3 min-w-[8rem]">
                  <div className="">{item.dados?.nome}</div>
                  <div className="text- text-[0.563rem] text-[#6E6E6E]">
                    Quantidade:{item.quantidade_comprada}
                  </div>
                </div>
              </div>
              <div className="w-1/4">
                <div>#{item.dados?.id}</div>
              </div>
              <div className="w-1/4">
                <div>{valorFormatado(item.preco_produto)}</div>
              </div>
              <div className="w-1/4 text-[#30B700] text-xs flex justify-center ">
                <div className="bg-[#31b70036] p-[0.62rem] flex justify-center items-center rounded-3xl max-w-[3.8rem]">
                  <div>Enviado</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
