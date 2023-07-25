import Conteudo from "@/src/components/administrativo/homeAdm/Conteudo";
import Estoque from "@/src/components/administrativo/homeAdm/info/Estoque";
import NavLateral from "@/src/components/administrativo/homeAdm/NavLateral";
import NavSuperior from "@/src/components/administrativo/homeAdm/NavSuperior";

export default function HomeAdm() {
  return (
    <div>
      <div className="flex ">
        <NavLateral page="home" />
        <Conteudo />
      </div>
    </div>
  );
}
