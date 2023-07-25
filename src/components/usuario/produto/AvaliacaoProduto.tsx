import { useState } from "react";
import StarRating from "./StarRating";
import { api } from "@/src/service/FetchAxios";

const Avaliacao = () => {
  const [avaliacao, setAvaliacao] = useState(0);
  
  const handleRate = async (value:any) => {
    try {
      await api.post("/avaliacao", { rating: value });
      setAvaliacao(value);
      console.log("Avaliação enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
    }
  };

  return (
    <div>
      <StarRating initialRating={avaliacao} onRate={handleRate} />
    </div>
  );
};

export default Avaliacao;
