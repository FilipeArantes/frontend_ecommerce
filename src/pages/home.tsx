import Head from "next/head";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
// import { UserContext } from "../context/UserContext";
import Conteudo from "@/src/components/usuario/inicio/Conteudo";
import { useRouter } from "next/router";

export default function Home() {
  const { logout }: any = useContext(AuthContext);

  return (
    <div className="bg-slate h-screen overflow-x-hidden">
      <Head>
        <title>Ipe Shop - Home</title>
      </Head>

      <Conteudo />
    </div>
  );
}
