import { api } from "@/src/service/FetchAxios";
import { data } from "autoprefixer";
import { useEffect, useState, ChangeEvent } from "react";

type CalcularFreteProps = {
  valorFrete: string;
  setValorFrete: (frete: string) => void;
};

export default function CalcularFrete({
  valorFrete,
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
          //const endereco = response.data;
          if (data.uf === "GO") {
            console.log("goias");
            console.log(data);
          }

          setValorFrete("22");
        }
      } catch (error) {
        console.error("Erro ao calcular o frete:", error);
        setValorFrete("Erro ao calcular o frete");
      }
    };

    calcularFrete();
  }, [cep, setValorFrete]);

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
