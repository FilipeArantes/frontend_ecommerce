import Image from "next/image";
import Logo from "@/src/assets/images/Logo.svg";
import { useRouter } from "next/router";
import React from "react";

type NavProps = {
  isLogin: boolean;
};

export default function Nav({ isLogin }: NavProps) {
  const router = useRouter();

  const toLogin = React.useCallback(() => {
    router.push("/login");
  }, [router]);
  const toRegister = React.useCallback(() => {
    router.push("/criar-conta");
  }, [router]);

  let class1 =
    "cursor-pointer hover:opacity-90 transition ease-in duration-300";
  let class2 =
    "ml-12 cursor-pointer text-gray-400 transition ease-in duration-200 hover:text-black";

  if (isLogin) {
    class1 =
      "cursor-pointer text-gray-400 transition ease-in duration-200 hover:text-black";
    class2 =
      "ml-12 cursor-pointer hover:opacity-90 transition ease-in duration-300";
  }

  return (
    <nav className="flex px-16 py-8 items-center">
      <div>
        <Image src={Logo} alt="IpeShop" className="cursor-pointer" />
      </div>

      <div className="text-3xl flex pl-40">
        <h1 onClick={toRegister} className={class1}>
          Criar Conta
        </h1>
        <h1 onClick={toLogin} className={class2}>
          Fazer Login
        </h1>
      </div>
    </nav>
  );
}
