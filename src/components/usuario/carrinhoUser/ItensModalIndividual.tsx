import { api } from "@/src/service/FetchAxios";
import { useEffect, useState } from "react";
import RemoverProduto from "./RemoverProduto";
import { valorFormatado } from "@/src/util/formatarValor";

type ItensConteudoProps = {
  id_carrinho: number;
  id_produto: number;
  nome: string;
  preco: number;
  descricao: string;
  imagem: string;
  quantidade: number;
};

export default function ItensModalIndividual() {
  const idUsuario =
    typeof window !== "undefined" ? localStorage.getItem("idUser") : null;

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [dados, setDados] = useState<ItensConteudoProps[]>([]);

  const atualizarDados = async () => {
    try {
      const { data } = await api.get<ItensConteudoProps[]>(
        `carrinho/${idUsuario}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDados(data);
    } catch (erro) {}
  };

  useEffect(() => {
    const fazerRequisicao = async () => {
      try {
        const { data } = await api.get<ItensConteudoProps[]>(
          `carrinho/${idUsuario}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const ids = data.map((item) => String(item.id_produto));
        setDados(data);
      } catch (erro) {}
    };

    fazerRequisicao();
  }, [idUsuario, token]);

  return (
    <div>
      <div className="bg-slate flex flex-col gap-2 max-h-[30rem]">
        <h1 className="text-2xl mb-2">Produtos</h1>
        {dados?.map((item: ItensConteudoProps, index: number) => (
          <div key={index}>
            <div className="bg-white flex flex-row items-center p-5 min-w-[35.6rem] rounded-xl justify-between gap">
              <div className="flex flex-col gap-[0.31rem] min-w-[18rem]">
                <div className="text-2xl">{item.nome}</div>
                <div className="text-gray-500 text-base">
                  Valor: {valorFormatado(item.preco)}
                </div>
              </div>
              <RemoverProduto
                idCarrinho={item.id_carrinho}
                idProduto={item.id_produto}
                atualizarDados={atualizarDados}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
