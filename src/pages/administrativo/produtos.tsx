import Conteudo from "@/src/components/administrativo/produtos/Conteudo";
import NavLateral from "@/src/components/administrativo/homeAdm/NavLateral";

export default function Produtos() {
  return (
    <div>
      <div className="flex overflow-hidden">
        <NavLateral page="produto" />
        <div>
          <Conteudo />
        </div>
      </div>
    </div>
  );
}
