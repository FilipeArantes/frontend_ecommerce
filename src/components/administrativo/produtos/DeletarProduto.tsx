import IpeApagar from "@/src/assets/icones/ipe-apagar.svg";
import { api } from "@/src/service/FetchAxios";
import Image from "next/image";
import { useState } from "react";
import Swal from "sweetalert2";

type DeletarProdutoProps = {
  nome: string;
  id: number;
  atualizarDados: () => void;
};

export default function DeletarProduto({
  nome,
  id,
  atualizarDados,
}: DeletarProdutoProps) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await api.delete(`produto/${id}`);
      setShowModal(false);
      atualizarDados();
      if ((response.status = 200)) {
        Swal.fire({
          icon: "success",
          title: "Produto deletado com sucesso",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.log;
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="cursor-pointer" onClick={openModal}>
        <Image src={IpeApagar} alt="IpeApagar" />
      </div>
      <div>
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-slate p-14 flex items-center flex-col rounded-lg gap-5 shadow-lg">
              <h1 className="text-5xl">Você tem certeza?</h1>
              <div className="text-2xl">
                Você realmente quer excluir{" "}
                <span className="uppercase text-orange">{nome}</span> da loja?
              </div>
              <div className="flex gap-12">
                <button
                  onClick={handleDelete}
                  className="w-64 p-5 text-2xl rounded-lg bg-gray-400"
                >
                  Sim
                </button>
                <button
                  onClick={closeModal}
                  className="w-64 p-5 text-2xl rounded-lg bg-red-500"
                >
                  Não
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
