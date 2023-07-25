import Nav from "@/src/components/usuario/nav/Nav";
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
          console.log(data);
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
            className="bg-slate pb-8 h-full my-2 pt-14 flex flex-col gap-10 px-48"
          >
            <div className="flex gap-10">
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
                  <p className="text-5xl">{item.nome}</p>
                  <AvaliacaoProduto />
                </div>
                <div className="bg-orange w-fit  text-white px-5 py-2 rounded-lg">
                  <p>Valor: {valorFormatado(item.preco)}</p>
                </div>
                <div className="flex flex-col mt-4">
                  <label htmlFor="cor">Cor</label>
                  <select
                    className="p-2 rounded-lg bg-gray-300 text-gray-400 w-fecharCatR"
                    name="cor"
                    id="cor"
                    defaultValue=""
                  >
                    <option value="" >
                      Sem Opções
                    </option>
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
                    <option value="">
                      Selecionar Quantidade
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
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
