import IpeCarrinho from "@/src/assets/icones/cart2.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export default function Carrinho() {
  const router = useRouter();

  const toCart = React.useCallback(() => {
    router.push("/carrinho");
  }, [router]);

  return (
    <div>
      <div
        onClick={toCart}
        className="bg-purple w-16 h-16 flex items-center justify-center rounded-full cursor-pointer hover:opacity-80 transition ease-in"
      >
        <Image src={IpeCarrinho} alt="" />
      </div>
    </div>
  );
}
