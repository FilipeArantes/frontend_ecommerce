import Image from "next/image";
import IpeSair from "@/src/assets/icones/ipe-close.svg";
import IpeAdicionar from "@/src/assets/icones/ipe-adicionar.svg";
import { useEffect, useState } from "react";
import Head from "next/head";
import { api } from "@/src/service/FetchAxios";

type AdicionarCategoriaProps = {
  atualizarDados: () => void;
};

export default function AdicionarCategoria({
  atualizarDados,
}: AdicionarCategoriaProps) {
  const [showModal, setShowModal] = useState(false);
  const [nomeCategoria, setNomeCategoria] = useState("");
  const [imagemCategoria, setimagemCategoria] = useState<File | null>(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    if (imagemCategoria !== null) {
      formData.append("imagem", imagemCategoria, imagemCategoria.name);
    }
    formData.append("nome", nomeCategoria);

    try {
      const response = await api.post("categoria", formData);
      setShowModal(false);
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
        className="fixed bottom-12 flex items-center justify-center hover:opacity-90 transition ease-in duration-200 bg-gray-300 cursor-pointer shadow right-12 z-50 p-4 h-14 w-14 rounded-full"
      >
        <Image src={IpeAdicionar} alt="IpeAdicionar" width={30} />
      </div>
      <div>
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="z-30 bg-slate p-14 flex items-center flex-col rounded-lg gap-5 shadow-lg w-modalCatW h-modalCatH">
              <button
                onClick={closeModal}
                className="absolute right-fecharCatR top-fecharCatT"
              >
                <Image src={IpeSair} alt="IpeSair" />
              </button>
              <div className="relative">
                <form encType="multipart/form-data" action="">
                  <input
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setimagemCategoria(file);
                      }
                    }}
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="bg-white w-modalCatImageW h-64 flex-col gap-2 text-black px-4 py-2 flex items-center justify-center rounded-lg cursor-pointer">
                    <div className="h-14 w-14 rounded-full bg-gray-300 flex items-center justify-center">
                      <Image src={IpeAdicionar} alt="" />
                    </div>
                    {imagemCategoria == null
                      ? "Adicionar Foto"
                      : `Imagem selecionada ${imagemCategoria.name}`}
                  </div>
                </form>
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
                Adicionar Categoria
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
