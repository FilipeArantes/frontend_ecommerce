import Nav from "@/src/components/usuario/nav/Nav";
import Banner from "./Banner";
import Produtos from "./Produtos";

export default function Conteudo() {
  return (
    <div className="">
      <Nav />
      <div>
        <Produtos />
      </div>
    </div>
  );
}
