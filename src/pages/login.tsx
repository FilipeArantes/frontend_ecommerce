import Head from "next/head";
import Nav from "../components/criar-conta/Nav";
import FormLogin from "../components/login/FormLogin";
import Imagem from "../components/criar-conta/Imagem";

export default function Login() {
  return (
    <>
      <Head>
        <title>IpeShop - Login</title>
      </Head>
      <Nav isLogin={true} />
      <div className="flex">
      <FormLogin/>
      <Imagem/>
      </div>
    </>
  );
}
