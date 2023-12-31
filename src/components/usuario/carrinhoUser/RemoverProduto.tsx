import IpeApagar from "@/src/assets/icones/ipe-apagar.svg";
import { api } from "@/src/service/FetchAxios";
import Image from "next/image";
import { type } from "os";
import Swal from "sweetalert2";

type RemoverProdutoProps = {
  idCarrinho: number;
  idProduto: number;
  atualizarDados: () => void;
};

export default function RemoverProduto({
  idCarrinho,
  idProduto,
  atualizarDados,
}: RemoverProdutoProps) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleDelete = async (e: any) => {
    try {
      const response = await api.delete(`carrinho/${idCarrinho}/${idProduto}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      atualizarDados();
      if ((response.status = 200)) {
        Swal.fire({
          icon: "success",
          title: "Produto removido do carrinho",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.log;
    }
  };

  return (
    <div>
      <div
        onClick={handleDelete}
        className="text-red-500 cursor-pointer flex flex-row items-center text-xs"
      >
        <Image src={IpeApagar} alt="" width={14} />
        <div>Remover</div>
      </div>
    </div>
  );
}
