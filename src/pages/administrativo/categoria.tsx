import Conteudo from "@/src/components/administrativo/categoria/Conteudo";
import NavLateral from "@/src/components/administrativo/homeAdm/NavLateral";

export default function CategoriaAdm() {
  return (
    <div className="flex overflow-hidden">
      <NavLateral page="categoria" />
      <div>
        <Conteudo/>
      </div>
    </div>
  );
}
