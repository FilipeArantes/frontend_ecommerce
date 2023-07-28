import { api } from "@/src/service/FetchAxios";
import { isValidEmail } from "@/src/util/ValidarEmail";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

type FinalizarCompraProps = {
  metodoPagamento: string;
  email: string;
  endereco: string;
  closeModal: () => void;
};

type ItensConteudoProps = {
  id_carrinho: number;
  id_produto: number;
  nome: string;
  preco_produto: number;
  quantidade: number;
};

export default function FinalizarCompra({
  metodoPagamento,
  email,
  endereco,
  closeModal,
}: FinalizarCompraProps) {
  const idUsuario =
    typeof window !== "undefined" ? localStorage.getItem("idUser") : null;

  const nomeUser =
    typeof window !== "undefined" ? localStorage.getItem("nomeUser") : null;

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const router = useRouter();

  const handleSubmit = async () => {
    if (!metodoPagamento) {
      Swal.fire({
        icon: "warning",
        title: "Escolha o método de pagamento",
      });
      return;
    }
    if (!isValidEmail(email)) {
      Swal.fire({
        icon: "warning",
        title: "E-mail inválido",
      });
      return;
    }
    try {
      const { data } = await api.get<ItensConteudoProps[]>(
        `carrinho/${idUsuario}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const itens = data.map((item) => ({
        nome_produto: item.nome,
        preco_produto: item.preco_produto,
        id_produto: item.id_produto,
      }));

      const itensData = await api.post("itens", itens, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const pedido = data.map((item, index) => ({
        produto: {
          nome: item.nome,
          preco: item.preco_produto,
          id_produto: item.id_produto,
          id_usuario: idUsuario,
          id_itens_pedido: itensData.data[index++],
          data_do_pedido: new Date().toISOString(),
          quantidade_comprada: item.quantidade,
          forma_pagamento: metodoPagamento,
          email: email,
        },
        endereco: endereco
          ? {
              id_usuario: idUsuario,
              endereco: endereco,
            }
          : undefined,
      }));

      const response = await api.post("pedido", pedido, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Pedido realizado com sucesso!",
          text: "Verifique seu e-mail para mais informações",
        });

        setTimeout(() => {
          router.push("/home");
        }, 2500);
      }

      closeModal();
    } catch (erro) {}
  };

  return (
    <div>
      <button
        onClick={handleSubmit}
        className="bg-purple text-white p-[0.62rem] mt-4 w-full rounded-xl"
      >
        Finalizar compra
      </button>
    </div>
  );
}
