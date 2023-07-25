import Estoque from "./info/Estoque";
import Rendimento from "./info/Rendimento";
import TotalPedidos from "./info/TotalPedidos";
import VendasPendentes from "./info/VendasPendentes";
import VendasRecentes from "./info/VendasRecentes";
import VerProdutos from "./info/VerProdutos";

export default function Conteudo() {
  return (
    <div className="flex w-screen">
      <div className="bg-slate h-screen pt-12 px-12 flex flex-col ">
        <h1 className="text-3xl w-full mb-14">Painel de Controle</h1>
        <div className="flex justify-between gap-5">
          <TotalPedidos />
          <Rendimento />
          <VendasPendentes />
        </div>
        <VerProdutos />
        <VendasRecentes />
      </div>
      <Estoque />
    </div>
  );
}
