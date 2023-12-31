import { api } from "@/src/service/FetchAxios";
import { headers } from "next/dist/client/components/headers";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import Banner from "./Banner";
import { valorFormatado } from "@/src/util/formatarValor";

type ConteudoProps = {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  imagem: string;
};

export default function Produtos() {
  const [dados, setDados] = useState<ConteudoProps[]>([]);
  const router = useRouter();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fazerRequisicao = async () => {
      try {
        const { data } = await api.get("", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDados(data);
      } catch (erro) {}
    };
    fazerRequisicao();
  }, [token]);

  const toProdutos = useCallback(
    (id: number) => {
      router.push(`/produto/${id}`);
    },
    [router]
  );

  return (
    <div className="px-48 mt-10">
      <Banner />
      <h1 className="text-3xl">Destaques para você</h1>
      <div className="flex text-center gap-x-20 flex-wrap">
        {dados?.map((item, index) => (
          <div
            key={index}
            className="my-2 cursor-pointer flex flex-row justify-between"
          >
            <div
              className="w-80 flex flex-col gap-2 flex-wrap "
              onClick={() => toProdutos(item.id)}
            >
              <div className="h-48 w-80 bg-white">
                <Image
                  className="h-[12rem] w-[20rem] rounded-lg object-contain"
                  src={item.imagem}
                  alt="Produto"
                  width={320}
                  height={192}
                />
              </div>
              <div className="flex flex-row justify-between items-center px-1">
                <div className="">{item.nome}</div>
                <div className="text-xl text-orange">
                  {valorFormatado(item.preco)}
                </div>
              </div>
              <div className="text-left max-w-80 flex flex-col flex-1 px-1 flex-wrap">
                <div className="text-gray-500 text-xs">Descrição</div>
                <div className="text-xs max-w-xs h-16">{item.descricao}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
