import IpeAlterar from "@/src/assets/icones/ipe-alterar.svg";
import IpeSair from "@/src/assets/icones/ipe-close.svg";
import IpeAdicionar from "@/src/assets/icones/ipe-adicionar.svg";
import { api } from "@/src/service/FetchAxios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { type } from "os";
import Swal from "sweetalert2";

type AlterarProdutoProps = {
  id: number;
  atualizarDados: () => void;
};

type CategoriaProps = {
  id: number;
  nome: string;
};

type DataProps = {
  id_categoria?: string;
  descricao?: string;
  nome?: string;
  preco?: string;
  quantidade_estoque?: string;
  imagem?: string;
};

export default function AlterarProduto({
  id,
  atualizarDados,
}: AlterarProdutoProps) {
  const [showModal, setShowModal] = useState(false);
  const [categorias, setCategorias] = useState<CategoriaProps[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [nomeProduto, setNomeProduto] = useState("");
  const [descricaoProduto, setDescricaoProduto] = useState("");
  const [precoProduto, setPrecoProduto] = useState("");
  const [quantidadeProduto, setQuantidadeProduto] = useState("");
  const [imagemProduto, setImagemProduto] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data: DataProps = {};

    if (categoriaSelecionada !== "") {
      data.id_categoria = categoriaSelecionada;
    }
    if (descricaoProduto !== "") {
      data.descricao = descricaoProduto;
    }
    if (nomeProduto !== "") {
      data.nome = nomeProduto;
    }
    if (precoProduto !== "") {
      data.preco = precoProduto;
    }
    if (quantidadeProduto !== "") {
      data.quantidade_estoque = quantidadeProduto;
    }
    if (imagemProduto !== "") {
      data.imagem = imagemProduto;
    }

    try {
      const response = await api.put(`produto/${id}`, data);
      console.log(response.data);
      setShowModal(false);
      if ((response.status = 200)) {
        atualizarDados();
        setShowModal(false);
        Swal.fire({
          icon: "success",
          title: "Produto alterado com sucesso",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = () => {
    fazerRequisicao();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const fazerRequisicao = async () => {
    try {
      const resposta = await api.get("categoria");
      const json = resposta.data;

      setCategorias(json);
    } catch (erro) {
      console.error(erro);
    }
  };

  return (
    <>
      <div className="cursor-pointer" onClick={openModal}>
        <Image src={IpeAlterar} alt="IpeApagar" />
      </div>
      <div>
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-slate p-8 flex justify-center items-center flex-col rounded-lg gap-5 shadow-lg w-modalW h-modalH">
              <button
                onClick={closeModal}
                className="absolute right-fecharR top-fechaT"
              >
                <Image src={IpeSair} alt="IpeSair" />
              </button>
              <div className="flex gap-5 items-start">
                <div className="relative">
                  <input
                    onChange={(e) => setImagemProduto(e.target.value)}
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="bg-white w-modalImageW h-modalImageH flex-col gap-2 text-black px-4 py-2 flex items-center justify-center rounded-lg cursor-pointer">
                    <div className="h-14 w-14 rounded-full bg-gray-300 flex items-center justify-center">
                      <Image src={IpeAdicionar} alt="" />
                    </div>
                    Adicionar Foto
                  </div>
                </div>
                <div className="flex flex-col text-left justify-center gap-5">
                  <div className="flex flex-row gap-7">
                    <div className="w-72">
                      <label className="mb-2" htmlFor="produto">
                        Nome do Produto
                      </label>
                      <input
                        onChange={(e) => setNomeProduto(e.target.value)}
                        className="w-full p-2 rounded-lg"
                        type="text"
                        id="produto"
                        placeholder="Nome..."
                      />
                    </div>
                    <div className="w-72">
                      <label className="mb-2" htmlFor="valor">
                        Valor
                      </label>
                      <input
                        onChange={(e) => setPrecoProduto(e.target.value)}
                        className="w-full p-2 rounded-lg"
                        type="text"
                        id="valor"
                        placeholder="R$..."
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2" htmlFor="quantidade">
                      Quantidade
                    </label>
                    <input
                      onChange={(e) => setQuantidadeProduto(e.target.value)}
                      className="w-full p-2 rounded-lg"
                      type="text"
                      placeholder="Quantidade..."
                      id="quantidade"
                    />
                  </div>
                  <div>
                    <label className="mb-2" htmlFor="categoria">
                      Categoria
                    </label>
                    <select
                      onChange={(e) => setCategoriaSelecionada(e.target.value)}
                      className="bg-white w-full p-2 rounded-lg"
                      name="categoria"
                      id="categoria"
                      defaultValue=""
                    >
                      <option value="">Selecionar Categoria</option>
                      {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                          {categoria.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2" htmlFor="descricao">
                      Descrição
                    </label>
                    <input
                      onChange={(e) => setDescricaoProduto(e.target.value)}
                      className="text-start flex flex-wrap w-full p-2 rounded-lg h-80"
                      type="text"
                      placeholder="Descrição..."
                      id="descricao"
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="w-adicionar bg-purple text-white px-4 py-2 rounded-lg"
                  >
                    Atualizar Produto
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
