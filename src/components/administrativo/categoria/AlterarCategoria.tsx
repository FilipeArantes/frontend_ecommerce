import Image from "next/image";
import IpeSair from "@/src/assets/icones/ipe-close.svg";
import IpeAdicionar from "@/src/assets/icones/ipe-adicionar.svg";
import IpeAlterar from "@/src/assets/icones/ipe-alterar-branco.svg";
import { useEffect, useState } from "react";
import Head from "next/head";
import { api } from "@/src/service/FetchAxios";

type AlterarCategoriaProps = {
  id: number;
  atualizarDados: () => void
};

type DataProps = {
  nome?: string;
  imagem?: string;
};

export default function AlterarCategoria({ id , atualizarDados}: AlterarCategoriaProps) {
  const [showModal, setShowModal] = useState(false);
  const [nomeCategoria, setNomeCategoria] = useState("");
  const [imagemCategoria, setimagemCategoria] = useState("");

  const handleSubmit = async (e: any) => {
    const data: DataProps = {};

    if (nomeCategoria !== "") {
      data.nome = nomeCategoria;
    }
    if (imagemCategoria !== "") {
      data.imagem = imagemCategoria;
    }

    try {
      const response = await api.put(`categoria/${id}`, data);
      console.log(response.data);
      atualizarDados();
    } catch (error) {
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
        <title>Administrativo - Categorias</title>
      </Head>
      <div
        onClick={openModal}
        className="cursor-pointer"
      >
        <Image src={IpeAlterar} alt="IpeAdicionar" width={20} />
      </div>
      <div>
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="z-50 bg-slate p-14 flex items-center flex-col rounded-lg gap-5 shadow-lg w-modalCatW h-modalCatH">
              <button
                onClick={closeModal}
                className="absolute right-fecharCatR top-fecharCatT"
              >
                <Image src={IpeSair} alt="IpeSair" />
              </button>
              <div className="relative">
                <input
                  onChange={(e) => setimagemCategoria(e.target.value)}
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="bg-white w-modalCatImageW h-64 flex-col gap-2 text-black px-4 py-2 flex items-center justify-center rounded-lg cursor-pointer">
                  <div className="h-14 w-14 rounded-full bg-gray-300 flex items-center justify-center">
                    <Image src={IpeAdicionar} alt="" />
                  </div>
                  Adicionar Foto
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="categoria">Nome da Categoria</label>
                <input
                  onChange={(e) => setNomeCategoria(e.target.value)}
                  className="p-2 w-modalCatImageW rounded-lg"
                  type="text"
                  placeholder="Nome..."
                  id="categoria"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="bg-purple text-white w-modalCatImageW p-2 rounded-lg"
              >
                Alterar Categoria
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
