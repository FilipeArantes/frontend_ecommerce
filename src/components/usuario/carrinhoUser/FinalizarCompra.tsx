import { api } from "@/src/service/FetchAxios";
import Swal from "sweetalert2";

type FinalizarCompraProps = {
  metodoPagamento: string;
  email: string;
  endereco: string;
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
}: FinalizarCompraProps) {
  const idUsuario =
    typeof window !== "undefined" ? localStorage.getItem("idUser") : null;

  const enderecoDividido = endereco.split(",").map((item) => item.trim());

  const handleSubmit = async () => {
    if (enderecoDividido.length < 4) {
      Swal.fire({
        icon: "warning",
        title: "Está faltando algo",
        text: "O endereço está incompleto um desses não foi adicionado Rua, Número, Bairro ou Cidade",
      });
      return;
    }
    if (!metodoPagamento) {
      Swal.fire({
        icon: "warning",
        title: "Escolha o método de pagamento",
      });
      return;
    }
    try {
      const { data } = await api.get<ItensConteudoProps[]>(
        `carrinho/${idUsuario}`
      );

      const itens = data.map((item) => ({
        nome_produto: item.nome,
        preco_produto: item.preco_produto,
        id_produto: item.id_produto,
      }));

      const itensData = await api.post("itens", itens);

      const pedido = data.map((item, index) => ({
        produto: {
          id_produto: item.id_produto,
          id_usuario: idUsuario,
          id_itens_pedido: itensData.data[index++],
          data_do_pedido: new Date().toISOString(),
          quantidade_comprada: item.quantidade,
          forma_pagamento: metodoPagamento,
          email: email,
        },
        endereco: {
          rua: enderecoDividido[0],
          numero: enderecoDividido[1],
          bairro: enderecoDividido[2],
          cidade: enderecoDividido[3],
        },
      }));

      const response = await api.post("pedido", pedido);
      console.log(response);
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
