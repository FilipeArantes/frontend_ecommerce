import { api } from "@/src/service/FetchAxios";
import { calcularFrete as calcularFreteValor } from "@/src/util/CalcularFrete";
import { data } from "autoprefixer";
import { title } from "process";
import { useEffect, useState, ChangeEvent } from "react";
import Swal from "sweetalert2";

type CalcularFreteProps = {
  valorProduto: number;
  setValorFrete: (frete: string) => void;
};

export default function CalcularFrete({
  valorProduto,
  setValorFrete,
}: CalcularFreteProps) {
  const [cep, setCep] = useState("");

  useEffect(() => {
    const calcularFrete = async () => {
      try {
        if (cep.length === 8) {
          const { data } = await api.get(
            `https://viacep.com.br/ws/${cep}/json/`
          );
          if (data.erro) {
            Swal.fire({
              icon: "warning",
              title: "Este CEP não existe"
            })
          }
          const valorFrete = calcularFreteValor({ uf: data.uf, valorProduto });
          setValorFrete(String(valorFrete));
        }
      } catch (error) {
        console.error("Erro ao calcular o frete:", error);
        setValorFrete("Erro ao calcular o frete");
      }
    };

    calcularFrete();
  }, [cep, setValorFrete, valorProduto]);

  const handleChangeCep = (event: ChangeEvent<HTMLInputElement>) => {
    const novoCep = event.target.value;
    setCep(novoCep);
  };

  return (
    <div>
      <div className="flex flex-col  border-gray-300 py-4  border-b-2">
        <label htmlFor="cep">CEP</label>
        <input
          type="text"
          id="cep"
          name="cep"
          value={cep}
          placeholder="Pesquisar por..."
          onChange={handleChangeCep}
          className="border bg-slate border-none px-3 py-2 rounded-lg"
        />
      </div>
    </div>
  );
}
