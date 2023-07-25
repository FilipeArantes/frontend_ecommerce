import React, { useCallback, useEffect, useState } from "react";
import { api } from "@/src/service/FetchAxios";
import AdicionarProduto from "./AdicionarProduto";
import AlterarProduto from "./AlterarProduto";
import DeletarProduto from "./DeletarProduto";
import Image from "next/image";
import { valorFormatado } from "@/src/util/formatarValor";

type ConteudoProps = {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  imagem: string;
};

export default function Conteudo() {
  const [dados, setDados] = useState<ConteudoProps[]>([]);

  const atualizarDados = useCallback(async () => {
    try {
      const { data } = await api.get("produto");
      setDados(data);
    } catch (erro) {}
  }, []);

  useEffect(() => {
    const fazerRequisicao = async () => {
      try {
        const { data } = await api.get("produto");
        setDados(data);
      } catch (erro) {}
    };

    fazerRequisicao();
  }, []);

  return (
    <div className="bg-slate w-screen h-screen pt-12 px-10 flex flex-col ">
      <h1 className="text-3xl ml-6 mb-14">Produtos</h1>
      <div className="flex text-center flex-wrap scrollbar overflow-y-scroll">
        {dados?.map((item, index) => (
          <div
            key={index}
            className=" px-2 mx-5 my-2 flex flex-row justify-between"
          >
            <div className="w-80 flex justify-start flex-col gap-2 flex-wrap ">
              <div className=" h-48 w-80">
                <Image
                  className="h-[12rem] w-[20rem] rounded-lg"
                  src={item.imagem}
                  alt="Produto"
                  width={320}
                  height={192}
                />
              </div>
              <div className="flex flex-row justify-between items-center px-1">
                <p className="flex gap-2">
                  {item.nome}
                  <AlterarProduto
                    id={item.id}
                    atualizarDados={atualizarDados}
                  />
                  <DeletarProduto
                    nome={item.nome}
                    id={item.id}
                    atualizarDados={atualizarDados}
                  />
                </p>
                <p className="text-xl text-orange">
                  {valorFormatado(item.preco)}
                </p>
              </div>
              <div className="text-left max-w-80 flex flex-col flex-1 px-1 flex-wrap">
                <p className="text-gray-500 text-xs">Descrição</p>
                <p className="text-xs max-w-xs h-16">{item.descricao}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AdicionarProduto atualizarDados={atualizarDados} />
    </div>
  );
}
