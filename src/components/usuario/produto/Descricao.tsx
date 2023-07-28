import React, { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

type DescProps = {
  descricao: string;
};

export default function Descricao({ descricao }: DescProps) {
  const [mostrarDescricao, setMostrarDescricao] = useState(false);

  const toggleDescricao = () => {
    setMostrarDescricao(!mostrarDescricao);
  };

  return (
    <div className="bg-white p-7 flex flex-col rounded-lg">
      <div className="flex items-center justify-between">
        <h1>Descrição</h1>
        <button
          onClick={toggleDescricao}
          className={`text-gray-500 transform transition-transform ${
            mostrarDescricao ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaArrowDown />
        </button>
      </div>
      <div className="mt-4 transform transition-transform text-gray-600">
        {mostrarDescricao && <div>{descricao}</div>}
      </div>
    </div>
  );
}
