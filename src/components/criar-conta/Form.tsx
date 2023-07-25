import { api } from "@/src/service/FetchAxios";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Button from "@/src/components/formComps/Button";
import Input from "@/src/components/formComps/Input";
import InputNome from "@/src/components/formComps/InputNome";
import InputSobrenome from "@/src/components/formComps/InputSobrenome";
import { useRouter } from "next/router";
import { AuthContext } from "@/src/context/AuthContext";

export default function Form() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login }: any = useContext(AuthContext);

  const router = useRouter();

  const handleSubmit = async (event: any) => {
    if (!nome && !sobrenome && !email && !senha) {
      Swal.fire({
        icon: "error",
        title: "Cadastro Inválido",
        text: "Nenhum campo foi preenchido",
      });
      return;
    }
    if (!nome || !sobrenome || !email || !senha) {
      Swal.fire({
        icon: "warning",
        title: "Campo Inválido",
        text: "Preencha todos os campos",
      });
      return;
    }

    try {
      const { data } = await api.post("usuario", {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        senha: senha,
      });

      const emailStore = data.me[0].email;
      const idStore = data.me[0].id;

      const token = data.token;
      if (typeof token === "string" && token !== "") {
        console.log(typeof token);
        login(token, emailStore, idStore);
        router.push("/home");
      }

      setNome("");
      setSobrenome("");
      setEmail("");
      setSenha("");
    } catch (error) {
      setNome("");
      setSobrenome("");
      setEmail("");
      setSenha("");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/home");
    }
  }, [router]);

  return (
    <div className="flex flex-col px-16 pt-20 max-w-2xl">
      <h1 className="text-6xl">Criar nova conta</h1>
      <p className="text-2xl pt-5 pb-8">
        Já tem uma Conta?
        <Link href="/login">
          <span className="transition ease-in duration-50 hover:opacity-80 cursor-pointer text-orange ml-1">
            Fazer Login
          </span>
        </Link>
      </p>
      <div className="flex">
        <InputNome
          label="Nome"
          nome="nome"
          type="text"
          placeHolder="Nome..."
          value={nome}
          onChange={(e: any) => setNome(e.target.value)}
        />

        <InputSobrenome
          label="Sobrenome"
          nome="sobrenome"
          type="text"
          placeHolder="Sobrenome..."
          value={sobrenome}
          onChange={(e: any) => setSobrenome(e.target.value)}
        />
      </div>
      <Input
        label="E-mail"
        nome="email"
        type="email"
        placeHolder="E-mail..."
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
      />
      <Input
        label="Senha"
        nome="senha"
        type="password"
        placeHolder="Senha..."
        value={senha}
        onChange={(e: any) => setSenha(e.target.value)}
      />

      <Button onClick={handleSubmit} text="Criar conta" />
    </div>
  );
}
