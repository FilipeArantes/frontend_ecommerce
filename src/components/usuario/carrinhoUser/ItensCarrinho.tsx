import { api } from "@/src/service/FetchAxios";
import { useEffect, useState } from "react";
import Image from "next/image";
import IpeSetaDireita from "@/src/assets/icones/ipe-seta-direita.svg";
import IpeSetaESquerda from "@/src/assets/icones/ipe-seta-esquerda.svg";
import RemoverProduto from "./RemoverProduto";
import { valorFormatado } from "@/src/util/formatarValor";

type ConteudoProps = {
  id_carrinho: number;
  id_produto: number;
  nome: string;
  preco_produto: number;
  descricao: string;
  imagem: string;
  quantidade: number;
};

export default function ItensCarrinho() {
  const [dados, setDados] = useState<ConteudoProps[]>([]);

  const idUsuario =
    typeof window !== "undefined" ? localStorage.getItem("idUser") : null;

  const atualizarDados = async () => {
    try {
      const { data } = await api.get(`carrinho/${idUsuario}`);
      setDados(data);
    } catch (erro) {}
  };

  useEffect(() => {
    const fazerRequisicao = async () => {
      try {
        const { data } = await api.get(`carrinho/${idUsuario}`);
        setDados(data);
      } catch (erro) {}
    };

    fazerRequisicao();
  }, [idUsuario]);

  const handleIncrement = (index: number) => {
    setDados((prevDados) => {
      const updatedDados = [...prevDados];
      const item = updatedDados[index];
      item.quantidade += 1;
      return updatedDados;
    });
  };

  const handleDecrement = (index: number) => {
    setDados((prevDados) => {
      const updatedDados = [...prevDados];
      const item = updatedDados[index];
      if (item.quantidade > 1) {
        item.quantidade -= 1;
      }
      return updatedDados;
    });
  };

  return (
    <div>
      {dados.length === 0 ? (
        <div className="bg-white min-h-[rem] w-[62rem] rounded-lg p-4 text-center">
          Nenhum produto no carrinho
        </div>
      ) : (
        <div className="bg-white flex flex-col flex-wrap max-h-[42rem] w-[62rem] rounded-lg px-10 py-8">
          {dados.map((item, index) => (
            <div
              key={index}
              className="flex flex-row py gap-2 border-b-2 border-gray-300 py-4 "
            >
              <Image
                className="w-36 h-28 object-contain rounded-lg"
                src={item.imagem}
                alt=""
                width={145}
                height={0}
              />
              <div className="flex flex-col gap-6 py-2 min-w-[22rem] max-w-[23rem] flex-wrap">
                <p className="text-2xl">{item.nome}</p>
                <p className="text-base">{item.descricao}</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 text-xl">
                <p className="text-xs mb-2">Quantidade</p>
                <div className="flex items-center">
                  <button
                    className="text-black px-3 py-1 rounded"
                    onClick={() => handleDecrement(index)}
                  >
                    <Image src={IpeSetaESquerda} alt="" />
                  </button>
                  <p className="min-w-[1.2rem] flex justify-center">
                    {item.quantidade}
                  </p>
                  <button
                    className="text-black px-3 py-1 rounded"
                    onClick={() => handleIncrement(index)}
                  >
                    <Image src={IpeSetaDireita} alt="" />
                  </button>
                </div>
                <p className="mt-2">
                  <RemoverProduto
                    idCarrinho={item.id_carrinho}
                    idProduto={item.id_produto}
                    atualizarDados={atualizarDados}
                  />
                </p>
              </div>
              <div className="flex items-center text-orange ml-24 min-w-[12rem] justify-end ">
                <p>Valor:{valorFormatado(item.preco_produto)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
