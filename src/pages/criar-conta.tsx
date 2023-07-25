import Form from "../components/criar-conta/Form";
import Imagem from "../components/criar-conta/Imagem";
import Head from "next/head";
import Nav from "../components/criar-conta/Nav";

export default function CriarConta() {
  return (
    <>
      <Head>
        <title>IpeShop - Cria Conta</title>
      </Head>
      <Nav isLogin={false} />
      <div className="flex">
        <Form />
        <Imagem />
      </div>
    </>
  );
}
