import { api } from "@/src/service/FetchAxios";
import { valorFormatado } from "@/src/util/formatarValor";
import Image from "next/image";
import { useEffect, useState } from "react";

type EstoqueProps = {
  nome: string;
  preco: number;
  quantidade_estoque: number;
  imagem: string;
};

export default function Estoque() {
  const [dados, setDados] = useState<EstoqueProps[]>([]);
  useEffect(() => {
    const fazerRequisicao = async () => {
      try {
        const resposta = await api.get("produto");
        const jsonCompleto = resposta.data;
        const primeirosDezItens = jsonCompleto.slice(0, 10);

        const itensConvertidos = primeirosDezItens.map((item: any) => ({
          ...item,
        }));

        setDados(itensConvertidos);
      } catch (erro) {
        console.error(erro);
      }
    };

    fazerRequisicao();
  }, []);

  return (
    <div className="py-12 pr-10 h-screen w-full bg-slate">
      <div className="bg-white flex flex-col w-estoque max-h-estoqueAltura scrollbar-thin scrollbar-rounded-rounded-lg scrollbar-thumb-slate-200 h-estoqueAltura p-5 rounded-lg ">
        <p>Estoque</p>
        <div className="max-h-estoqueAltura overflow-x-hidden overflow-scroll">
          {dados?.map((item, index) => (
            <div
              className="flex bg-slate mt-5 items-center justify-between p-2 rounded-lg "
              key={index}
            >
              <div className="bg-white h-16 flex items-center w-16 rounded-xl mr-3 ">
                <Image
                  className="min-w-[4rem] object-contain rounded-lg"
                  src={item.imagem}
                  alt=""
                  width={64}
                  height={64}
                />
              </div>
              <div className="flex gap-60">
                <div className="text-left min-w-[5rem]">
                  <p>{item.nome}</p>
                  <p className="text-xs">{valorFormatado(item.preco)}</p>
                </div>
                <div className="text-center  pr-2">
                  <p>Quantidade</p>
                  <p>{item.quantidade_estoque}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
