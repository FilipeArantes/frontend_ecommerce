import { useState } from "react";
import ItensCarrinho from "./ItensCarrinho";
import Resumo from "./Resumo";

export default function MostrarCarrinho() {
  return (
    <div>
      <div className="bg-slate justify-center h-[83vh] gap-10 flex px-48 pt-12">
        <ItensCarrinho />
        <Resumo />
      </div>
    </div>
  );
}
