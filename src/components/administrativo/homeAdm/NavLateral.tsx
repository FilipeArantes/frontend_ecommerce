import Image from "next/image";
import Logo from "@/src/assets/images/Logo.svg";
import IpeCasaAtivo from "@/src/assets/iconeAtivo/ipe-casa-ativo.svg";
import IpeCasa from "@/src/assets/icones/ipe-casa.svg";
import IpeExtrato from "@/src/assets/icones/ipe-extrato-bancario.svg";
import IpeExtratoAtivo from "@/src/assets/iconeAtivo/ipe-extrato-ativo.svg";
import IpeBoleto from "@/src/assets/icones/ipe-boleto-atualizar-2.svg";
import IpeBoletoAtivo from "@/src/assets/iconeAtivo/ipe-boleto-ativo.svg";
import IpeBagAtiva from "@/src/assets/iconeAtivo/bag-ativa.svg";
import IpeBag from "@/src/assets/icones/bag.svg";
import IpeNotificacao from "@/src/assets/icones/ipe-notificacoes.svg";
import IpePerfil from "@/src/assets/icones/ipe-perfil.svg";
import IpeEngrenagem from "@/src/assets/icones/ipe-engrenagem.svg";
import IpeSair from "@/src/assets/icones/ipe-sair.svg";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/src/context/AuthContext";

type NavProps = {
  page: string;
};

const pageData = [
  {
    path: "/administrativo/home",
    label: "Painel de Controle",
    icon: IpeCasa,
    iconActive: IpeCasaAtivo,
  },
  {
    path: "/administrativo/pedidos",
    label: "Pedidos",
    icon: IpeExtrato,
    iconActive: IpeExtratoAtivo,
  },
  {
    path: "/administrativo/categoria",
    label: "Categorias",
    icon: IpeBoleto,
    iconActive: IpeBoletoAtivo,
  },
  {
    path: "/administrativo/produtos",
    label: "Produtos",
    icon: IpeBag,
    iconActive: IpeBagAtiva,
  },
];

export default function NavLateral({ page }: NavProps) {
  const [currentPage, setCurrentPage] = useState("");
  const { logout }: any = useContext(AuthContext);

  const router = useRouter();

  const navigateToPage = (path: string) => {
    router.push(path);
  };

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      setCurrentPage(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    if (router.pathname !== currentPage) {
      setCurrentPage(router.pathname);
    }
  }, [router.pathname, currentPage]);

  return (
    <nav className="pl-10 pt-10 h-screen min-w-nav">
      <div>
        <Image
          src={Logo}
          alt="IpeShop"
          className="cursor-pointer"
          width={220}
        />
        <div className="text-gray-400 mt-12 text-base">Visão Geral</div>
        <div className="mt-6">
          {pageData.map((data) => (
            <div
              key={data.path}
              onClick={() => navigateToPage(data.path)}
              className={`flex mt-10 cursor-pointer hover:text-orange transition ease-in duration-200 ${
                currentPage === data.path ? "text-orange" : ""
              }`}
            >
              <Image
                className="mr-5"
                src={currentPage === data.path ? data.iconActive : data.icon}
                width={24}
                alt={data.label}
              />{" "}
              {data.label}
            </div>
          ))}
        </div>
        <div className="text-gray-400 mt-16 text-sm">Ferramentas</div>
        <div>
          <div className="flex mt-10 cursor-pointer hover:text-orange transition ease-in duration-200">
            <Image className="mr-5" src={IpePerfil} width={24} alt="IpeCasa" />{" "}
            Perfil
          </div>
          <div className="flex mt-10 cursor-pointer hover:text-orange transition ease-in duration-200">
            <Image
              className="mr-5"
              src={IpeEngrenagem}
              width={24}
              alt="IpeCasa"
            />{" "}
            Configurações
          </div>
          <div className="flex mt-10 cursor-pointer hover:text-orange transition ease-in duration-200">
            <Image
              className="mr-5"
              src={IpeNotificacao}
              width={24}
              alt="IpeCasa"
            />{" "}
            Mensagens
          </div>
        </div>
        <div onClick={logout} className="text-vermei cursor-pointer flex mt-44 hover:opacity-90">
          <Image className="mr-5" src={IpeSair} width={24} alt="IpeCasa" />
          Sair do Sistema
        </div>
      </div>
    </nav>
  );
}
