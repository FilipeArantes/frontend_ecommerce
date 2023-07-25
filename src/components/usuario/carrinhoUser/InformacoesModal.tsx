import { useEffect, useState } from "react";
import FinalizarCompra from "./FinalizarCompra";

export default function InformacoesModal() {
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [email, setEmail] = useState("");
  const [endereco, setEndereco] = useState("");
  return (
    <div>
      <h1 className="text-2xl mb-5">Informações</h1>
      <div className="flex flex-col gap-5">
        <div>
          <label htmlFor="endereco">Endereço de Entrega <span className="text-xs text-orange">(separe por vírgulas)</span></label>
          <input
            onChange={(e) => setEndereco(e.target.value)}
            className="px-[0.88rem] py-[0.63rem] rounded-xl min-w-[27.5rem]"
            id="endereco"
            type="text"
            placeholder="Rua, número, bairro, cidade"
          />
        </div>
        <div className="flex flex-row">
          <div>
            <label htmlFor="telefone">Telefone</label>
            <input
              className="px-[0.88rem] py-[0.63rem] max-w-[13.1rem] rounded-xl"
              type="text"
              id="telefone"
              placeholder="Telefone..."
            />
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="px-[0.88rem] py-[0.63rem] max-w-[13.1rem] rounded-xl"
              type="text"
              id="email"
              placeholder="E-mail..."
            />
          </div>
        </div>
        <div>
          <label htmlFor="pagamento">Método de Pagamento</label>
          <select
            className="text-gray-700 px-[0.88rem] py-[0.63rem] bg-white min-w-[27.5rem] rounded-xl"
            onChange={(e) => setMetodoPagamento(e.target.value)}
            name="pagamento"
            id="pagamento"
            defaultValue=""
          >
            <option value="">Selecione o Método de Pagamento</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
            <option value="Boleto bancário">Boleto bancário</option>
            <option value="Pix">Pix</option>
          </select>
        </div>
        <div className="flex gap-[0.69rem]">
          <input
            className="px-[0.88rem] py-[0.63rem] rounded-xl"
            type="text"
            placeholder="Cupom de Desconto"
          />
          <button className="bg-purple px-[1rem] py-[0.63rem] rounded-xl text-white">
            Aplicar
          </button>
        </div>
        <FinalizarCompra email={email} endereco={endereco} metodoPagamento={metodoPagamento}/>
      </div>
    </div>
  );
}
