import { useEffect, useState } from "react";
import { api } from "@/src/service/FetchAxios";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

type ComentarioProps = {
  produtoId: number;
};

type Comentario = {
  id: number;
  comentario: string;
  data: string;
  userId: number;
};

export default function Comentario({ produtoId }: ComentarioProps) {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [novoComentario, setNovoComentario] = useState("");
  const [mostrarCometario, setMostrarComentario] = useState(false);
  const id =
    typeof window !== "undefined" ? localStorage.getItem("idUser") : null;

  // useEffect(() => {
  //   atualizarDados();
  // }, []);

  const atualizarDados = async () => {
    try {
      const { data } = await api.get("comentario");
      setComentarios(data);
    } catch (erro) {
      console.error("Erro ao obter os comentários:", erro);
    }
  };

  const handleEnviarComentario = async () => {
    try {
      const novoComentarioData = {
        id_usuario: id,
        id_produto: produtoId,
        comentario: novoComentario,
        data_avaliacao: new Date().toISOString(),
      };

      await api.post("comentario", novoComentarioData);
      setNovoComentario("");
      atualizarDados();
    } catch (error) {
      console.error("Erro ao enviar o comentário:", error);
    }
  };

  const handleToggleComentario = () => {
    setMostrarComentario((prevState) => !prevState);
  };

  return (
    <div className="bg-white p-7">
      <div className="flex items-center justify-between ">
        <h2 className="p">Comentários</h2>
        <button
          onClick={handleToggleComentario}
          className={`text-gray-500 transform transition-transform ${
            mostrarCometario ? "rotate-180" : "rotate-0"
          }`}
        >
          <FaArrowDown />
        </button>
      </div>
      {mostrarCometario && (
        <div>
          {comentarios.map((comentario) => (
            <div key={comentario.id}>
              <p>{comentario.comentario}</p>
              <p>{comentario.data}</p>
              <p>{comentario.userId}</p>
            </div>
          ))}

          <textarea
            placeholder="Digite seu comentário..."
            value={novoComentario}
            onChange={(event) => setNovoComentario(event.target.value)}
            rows={4}
            cols={50}
            style={{
              resize: "none",
              textAlign: "left",
              verticalAlign: "top",
            }}
          />
          <button
            className="p-2 bg-purple text-white rounded-2xl"
            onClick={handleEnviarComentario}
          >
            Enviar Comentário
          </button>
        </div>
      )}
    </div>
  );
}
