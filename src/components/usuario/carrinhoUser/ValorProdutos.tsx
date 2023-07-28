import { api } from "@/src/service/FetchAxios";
import { valorFormatado } from "@/src/util/formatarValor";
import { useEffect, useState } from "react";

type ConteudoProps = {
  sum: number;
};

type ValorProdutoProps = {
  setValorProduto: (valor: string) => void;
};

export default function ValorProdutos({ setValorProduto }: ValorProdutoProps) {
  const [dados, setDados] = useState<ConteudoProps | null>(null);

  const idUsuario =
    typeof window !== "undefined" ? localStorage.getItem("idUser") : null;

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fazerRequisicao = async () => {
      try {
        const { data } = await api.get(`carrinhoSum/${idUsuario}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDados(data);
        setValorProduto(data.sum);
      } catch (erro) {}
    };

    fazerRequisicao();
  }, [idUsuario, setValorProduto, token]);

  return (
    <div>
      {dados === null ? (
        <div className="flex flex-row justify-between">
          <div>Valor dos Produtos:</div>
          <div>{valorFormatado(0)}</div>
        </div>
      ) : (
        <div>
          <div className="flex flex-row justify-between">
            <div>Valor dos Produtos:</div>
            <div>{valorFormatado(dados.sum)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
