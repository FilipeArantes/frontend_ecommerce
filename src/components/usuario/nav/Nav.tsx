import Image from "next/image";
import Logo from "@/src/assets/images/Logo.svg";
import IpeSair from "@/src/assets/icones/ipe-sair (1).svg";
import InputSearch from "./InputSearch";
import Carrinho from "./Carrinho";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { AuthContext } from "@/src/context/AuthContext";

export default function Nav() {
  const { logout }: any = useContext(AuthContext);

  const router = useRouter();
  const toHome = React.useCallback(() => {
    router.push("/home");
  }, [router]);

  return (
    <div className="bg-white flex flex-row items-center gap-x-modalImageH px-44 py-12 static">
      <Image
        className="cursor-pointer"
        src={Logo}
        alt="Logo"
        width={5000}
        onClick={toHome}
      />
      <div className="flex gap-32 items-center flex-row ml-4">
        <InputSearch />
        <Carrinho />
        <button onClick={logout} className="flex flex-col items-center">
          <Image src={IpeSair} alt="" width={30}/>Logout
        </button>
      </div>
    </div>
  );
}
