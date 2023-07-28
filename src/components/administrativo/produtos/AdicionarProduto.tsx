import Image from "next/image";
import IpeSair from "@/src/assets/icones/ipe-close.svg";
import IpeAdicionar from "@/src/assets/icones/ipe-adicionar.svg";
import { useEffect, useState } from "react";
import Head from "next/head";
import { api } from "@/src/service/FetchAxios";
import { useRouter } from "next/router";
import InputTextMenor from "./info/InputTextMenor";
import InputText from "./info/InputText";
import InputTextDesc from "./info/InputTextDesc";
import InputSelect from "./info/InputSelect";
import Swal from "sweetalert2";

type AdicionarProdutoProps = {
  atualizarDados: () => void;
};

type CategoriaProps = {
  id: number;
  nome: string;
};

type ConteudoProps = {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  imagem: string;
};

export default function AdicionarProduto({
  atualizarDados,
}: AdicionarProdutoProps) {
  const [showModal, setShowModal] = useState(false);
  const [categorias, setCategorias] = useState<CategoriaProps[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [nomeProduto, setNomeProduto] = useState("");
  const [descricaoProduto, setDescricaoProduto] = useState("");
  const [precoProduto, setPrecoProduto] = useState("");
  const [quantidadeProduto, setQuantidadeProduto] = useState("");
  const [imagemProduto, setImagemProduto] = useState<File | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (
      categoriaSelecionada == "" ||
      nomeProduto == "" ||
      descricaoProduto == "" ||
      precoProduto == "" ||
      quantidadeProduto == "" ||
      imagemProduto == null
    ) {
      Swal.fire({
        icon: "warning",
        text: "Algo está faltando",
      });
      return;
    }

    const formData = new FormData();
    if (imagemProduto !== null) {
      formData.append("imagem", imagemProduto, imagemProduto.name);
    }
    formData.append("id_categoria", categoriaSelecionada);
    formData.append("descricao", descricaoProduto);
    formData.append("nome", nomeProduto);
    formData.append("preco", precoProduto);
    formData.append("quantidade_estoque", quantidadeProduto);

    try {
      const response = await api.post("produto", formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });
      atualizarDados();
      if ((response.status = 200)) {
        setShowModal(false);
        Swal.fire({
          icon: "success",
          title: "Produto adicionado a loja",
          timer: 1500,
          showConfirmButton: false,
        });
      }
      setCategoriaSelecionada("");
      setNomeProduto("");
      setDescricaoProduto("");
      setPrecoProduto("");
      setQuantidadeProduto("");
      setImagemProduto(null);
    } catch (error) {
      setCategoriaSelecionada("");
      setNomeProduto("");
      setDescricaoProduto("");
      setPrecoProduto("");
      setQuantidadeProduto("");
      setImagemProduto(null);
      console.log(error);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Head>
        <title>Administrativo - Produtos</title>
      </Head>
      <div
        onClick={openModal}
        className="fixed bottom-12 flex items-center justify-center hover:opacity-90 transition ease-in duration-200 bg-gray-300 cursor-pointer shadow right-12 z-50 p-4 h-14 w-14 rounded-full"
      >
        <Image src={IpeAdicionar} alt="IpeAdicionar" width={30} />
      </div>
      <div>
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-slate p-8 flex justify-center items-center flex-col rounded-lg gap-5 shadow-lg w-modalW h-modalH">
              <button
                onClick={closeModal}
                className="absolute right-fecharR top-fechaT"
              >
                <Image src={IpeSair} alt="IpeSair" />
              </button>
              <div className="flex gap-5 items-start">
                <div className="relative">
                  <form encType="multipart/form-data" action="">
                    <input
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setImagemProduto(file);
                        }
                      }}
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="bg-white w-modalImageW h-modalImageH flex-col gap-2 text-black px-4 py-2 flex items-center justify-center rounded-lg cursor-pointer">
                      <div className="h-14 w-14 rounded-full bg-gray-300 flex items-center justify-center">
                        <Image src={IpeAdicionar} alt="" />
                      </div>
                      {imagemProduto == null
                        ? "Adicionar Foto"
                        : `Imagem selecionada ${imagemProduto.name}`}
                    </div>
                  </form>
                </div>
                <div className="flex flex-col justify-center gap-5">
                  <div className="flex flex-row gap-7">
                    <InputTextMenor
                      text="Nome produto"
                      idName="produto"
                      placeholder="Nome..."
                      onChange={(e) => setNomeProduto(e.target.value)}
                    />
                    <InputTextMenor
                      text="Valor"
                      idName="valor"
                      placeholder="R$..."
                      onChange={(e) => setPrecoProduto(e.target.value)}
                    />
                  </div>
                  <div>
                    <InputText
                      text="Quantidade"
                      idName="quantidade"
                      placeholder="Quantidade..."
                      onChange={(e) => setQuantidadeProduto(e.target.value)}
                    />
                  </div>
                  <div>
                    <InputSelect
                      text="Categoria"
                      idName="categoria"
                      onChange={(e) => setCategoriaSelecionada(e.target.value)}
                    />
                  </div>
                  <div>
                    <InputTextDesc
                      text="Descrição"
                      idName="descricao"
                      placeholder="Descricao..."
                      onChange={(e) => setDescricaoProduto(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="w-adicionar bg-purple text-white px-4 py-2 rounded-lg"
                  >
                    Adicionar Produto
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
