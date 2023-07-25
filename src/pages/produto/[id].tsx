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
import ProdutoDetalhes from "@/src/components/usuario/inicio/ProdutoDetalhes";

type ProdutoProps = {
  id: number;
};

type ConteudoProps = {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  imagem: string;
};

export default function Produto() {
  return (
    <div>
      <Nav />
      <Head>
        <title>IpeShop</title>
      </Head>
      <ProdutoDetalhes />
    </div>
  );
}
