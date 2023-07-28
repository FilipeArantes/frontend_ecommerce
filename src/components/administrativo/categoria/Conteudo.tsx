import { api } from "@/src/service/FetchAxios";
import Image from "next/image";
import { useEffect, useState } from "react";
import AdicionarCategoria from "./AdicionarCategoria";
import AlterarCategoria from "./AlterarCategoria";
import DeletarCategoria from "./DeletarCategoria";

type ConteudoProps = {
  nome: string;
  id: number;
  imagem: string;
};

export default function Conteudo() {
  const [dados, setDados] = useState<ConteudoProps[]>([]);

  const atualizarDados = async () => {
    try {
      const resposta = await api.get("categoria");
      const json = resposta.data;
      setDados(json);
    } catch (erro) {}
  };

  useEffect(() => {
    const fazerRequisicao = async () => {
      try {
        const resposta = await api.get("categoria");
        const json = resposta.data;

        setDados(json);
      } catch (erro) {}
    };

    fazerRequisicao();
  }, []);
  return (
    <div className="bg-slate w-screen h-screen pt-12 px-10 flex flex-col ">
      <h1 className="text-3xl ml-6 mb-14">Categorias</h1>
      <div className="max-w-screen-2xl flex text-center flex-wrap scrollbar overflow-y-scroll">
        {dados?.map((item, index) => (
          <div
            key={index}
            className=" px-2 mx-5 mt-2 mb-10 flex flex-row justify-between"
          >
            <div className="w-80 ">
              <div className="h-[12rem] w-[20rem] flex gap-2 flex-col justify-center items-center">
                <Image
                  className="absolute brightness-50 h-[12rem] w-[20rem] rounded-lg"
                  src={item.imagem}
                  alt=""
                  height={1}
                  width={320}
                />
                <div className="text-white text-2xl z-[1]">{item.nome}</div>
                <div className="flex gap-2 flex-row z-[1]">
                  <AlterarCategoria
                    id={item.id}
                    atualizarDados={atualizarDados}
                  />
                  <DeletarCategoria
                    id={item.id}
                    nome={item.nome}
                    atualizarDados={atualizarDados}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AdicionarCategoria atualizarDados={atualizarDados} />
    </div>
  );
}
