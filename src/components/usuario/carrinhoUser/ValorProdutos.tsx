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

  useEffect(() => {
    const fazerRequisicao = async () => {
      try {
        const { data } = await api.get(`carrinhoSum/${idUsuario}`);
        setDados(data);
        setValorProduto(data.sum);
      } catch (erro) {}
    };

    fazerRequisicao();
  }, [idUsuario, setValorProduto]);

  return (
    <div>
      {dados === null ? (
        <div className="flex flex-row justify-between">
          <p>Valor dos Produtos:</p>
          <p>{valorFormatado(0)}</p>
        </div>
      ) : (
        <div>
          <div className="flex flex-row justify-between">
            <p>Valor dos Produtos:</p>
            <p>{valorFormatado(dados.sum)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
