import { api } from "@/src/service/FetchAxios";
import { useEffect, useState } from "react";

type InputSelectProps = {
  text: string;
  idName: string;
  onChange: (e: any) => void;
};

type CategoriaProps = {
  id: number;
  nome: string;
};

export default function InputSelect({
  text,
  idName,
  onChange,
}: InputSelectProps) {
  const [categorias, setCategorias] = useState<CategoriaProps[]>([]);

  useEffect(() => {
    const fazerRequisicao = async () => {
      try {
        const resposta = await api.get("categoria");
        const json = resposta.data;

        setCategorias(json);
      } catch (erro) {
        console.error(erro);
      }
    };

    fazerRequisicao();
  }, []);
  return (
    <>
      <label className="mb-2" htmlFor={idName}>
        {text}
      </label>
      <select
        required
        onChange={onChange}
        className="bg-white w-full p-2 rounded-lg"
        name={idName}
        id={idName}
        defaultValue=""
      >
        <option value="">Selecionar Categoria</option>
        {categorias.map((categoria) => (
          <option key={categoria.id} value={categoria.id}>
            {categoria.nome}
          </option>
        ))}
      </select>
    </>
  );
}
