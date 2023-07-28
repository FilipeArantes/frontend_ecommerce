import React, { use, useContext, useEffect, useState } from "react";
import Input from "@/src/components/formComps/Input";
import Button from "@/src/components/formComps/Button";
import { api } from "@/src/service/FetchAxios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { AuthContext } from "@/src/context/AuthContext";

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login, loginAdm }: any = useContext(AuthContext);
  const router = useRouter();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const toRegister = React.useCallback(() => {
    router.push("/criar-conta");
  }, [router]);

  const handleSubmit = async (event: any) => {
    if (!email && !senha) {
      Swal.fire({
        icon: "error",
        title: "Login Inválido",
        text: "Nenhum campo foi preenchido",
      });
      return;
    }
    if (!email || !senha) {
      Swal.fire({
        icon: "warning",
        title: "Login Inválido",
        text: "Preencha todos os campos",
      });
      return;
    }

    try {
      const { data } = await api.post("login", {
        email: email,
        senha: senha,
      });

      if (data.me == true) {
        loginAdm(data.token);
        console.log('admin')
        return;
      }

      const emailStore = data.me[0].email;
      const idUser = data.me[0].id;
      const nomeUser = data.me[0].nome;

      const token = data.token;
      if (typeof token === "string" && token !== "") {
        login(token, emailStore, idUser, nomeUser);
      }

      setEmail("");
      setSenha("");
    } catch (error) {
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
      <h1 className="text-6xl">Fazer Login</h1>
      <div className="text-2xl pt-5 pb-8">
        Não tem uma conta?
        <span
          onClick={toRegister}
          className="transition ease-in duration-50 hover:opacity-80 cursor-pointer text-orange ml-1"
        >
          Criar Conta
        </span>
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
      <Button onClick={handleSubmit} text="Fazer Login" />
    </div>
  );
}
