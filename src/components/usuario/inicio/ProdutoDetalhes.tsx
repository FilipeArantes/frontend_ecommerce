import { api } from "@/src/service/FetchAxios";
import Image from "next/image";
import { useRouter } from "next/router";
import AvaliacaoProduto from "@/src/components/usuario/produto/AvaliacaoProduto";
import { useContext, useEffect, useState } from "react";
import Descricao from "@/src/components/usuario/produto/Descricao";
import Comentario from "@/src/components/usuario/produto/Comentario";
import Head from "next/head";
import AdicionarCarrinho from "@/src/components/usuario/produto/AdicionarCarrinho";
import { valorFormatado } from "@/src/util/formatarValor";

type ConteudoProps = {
  id: number;
  nome: string;
  preco: number;
  quantidade_estoque: number;
  descricao: string;
  imagem: string;
};

export default function ProdutoDetalhes() {
  const [dados, setDados] = useState<ConteudoProps[]>([]);
  const [quantidade, setQuantidade] = useState("");

  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    const fazerRequisicao = async () => {
      try {
        if (id) {
          const { data } = await api.get(`produto/${id}`);
          setDados(data);
        }
      } catch (erro) {
        console.error(erro);
      }
    };

    fazerRequisicao();
  }, [id]);

  return (
    <div>
      <Head>
        <title>IpeShop</title>
      </Head>
      <div>
        {dados?.map((item, index) => (
          <div
            key={index}
            className="bg-slate pb-8 min-h-[83vh] my-2 pt-14 flex flex-col gap-10 px-48"
          >
            <div className="flex justify-center gap-10">
              <div className="rounded-lg bg-white">
                <Image
                  className="w-[47.5rem] h-[25rem] rounded-3xl  object-contain"
                  src={item.imagem}
                  alt=""
                  width={760}
                  height={20}
                />
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-row items-center gap-10">
                  <div className="text-5xl">{item.nome}</div>
                  <AvaliacaoProduto />
                </div>
                <div className="bg-orange w-fit  text-white px-5 py-2 rounded-lg">
                  <div>Valor: {valorFormatado(item.preco)}</div>
                </div>
                <div className="flex flex-col mt-4">
                  <label htmlFor="cor">Cor</label>
                  <select
                    className="p-2 rounded-lg bg-gray-300 text-gray-400 w-fecharCatR"
                    name="cor"
                    id="cor"
                    defaultValue=""
                  >
                    <option value="">Sem Opções</option>
                  </select>
                </div>
                <div className="flex gap-5 flex-col">
                  <label htmlFor="tamanho">Quantidade</label>
                  <select
                    className="p-2 rounded-lg bg-white text-black"
                    name="tamanho"
                    id="tamanho"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                  >
                    <option value="">Selecionar Quantidade</option>
                    {dados.length > 0 &&
                      Array.from({
                        length: Math.min(10, dados[0].quantidade_estoque),
                      }).map((_, index) => (
                        <option key={index} value={(index + 1).toString()}>
                          {index + 1}
                        </option>
                      ))}
                  </select>
                </div>
                <AdicionarCarrinho
                  quantidadeProduto={quantidade}
                  idProduto={id}
                  precoProduto={item.preco}
                />
              </div>
            </div>
            <div className="mt-8 ">
              <Descricao descricao={item.descricao} />
            </div>
            <div>
              <Comentario produtoId={item.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
