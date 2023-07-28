import IpeCarrinho from "@/src/assets/icones/cart2.svg";
import { api } from "@/src/service/FetchAxios";
import Image from "next/image";
import Swal from "sweetalert2";

type CarrinhoProps = {
  quantidadeProduto: string;
  idProduto: any;
  precoProduto: number;
};

export default function AdicionarCarrinho({
  quantidadeProduto,
  idProduto,
  precoProduto,
}: CarrinhoProps) {
  const idUsuario =
    typeof window !== "undefined" ? localStorage.getItem("idUser") : null;

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const precoPorQuantidade = precoProduto * Number(quantidadeProduto);

  const handleAdicionarCarrinho = async () => {
    if (quantidadeProduto == "") {
      Swal.fire({
        icon: "warning",
        title: "Algo está faltando",
        text: "Adicione a quantidade desejada",
      });
      return;
    }
    try {
      const produtoCarrinho = {
        id_usuario: idUsuario,
        id_produto: idProduto,
        quantidade: quantidadeProduto,
        preco_produto: precoPorQuantidade,
      };

      const response = await api.post("carrinho", produtoCarrinho, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Produto adicionado ao carrinho com sucesso",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {}
  };

  return (
    <div>
      <button
        onClick={handleAdicionarCarrinho}
        className="bg-purple text-white rounded-lg gap-4 w-full flex items-center justify-center p-4"
      >
        <Image src={IpeCarrinho} alt="" /> Adicionar ao Carrinho
      </button>
    </div>
  );
}
