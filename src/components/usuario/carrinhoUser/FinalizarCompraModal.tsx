import { api } from "@/src/service/FetchAxios";
import { useState } from "react";
import ModalCarrinhoIndividual from "./Carrinho";
import Carrinho from "./Carrinho";

export default function FinalizarCompraModal() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col gap-7 justify-center">
      <div className="flex flex-col items-center gap-7">
        <button
          onClick={openModal}
          className="bg-purple text-white p-[0.62rem] w-full rounded-xl"
        >
          Finalizar compra
        </button>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-slate p-8 flex content-start flex-col rounded-lg gap-5 shadow-lg w-[73rem] h-[34rem]">
            <Carrinho fechar={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}
