import IpeBag from "@/src/assets/icones/bag-frame.svg";
import IpeIr from "@/src/assets/icones/ipe-ir.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export default function VerProdutos() {
  const router = useRouter();

  const toProducts = React.useCallback(() => {
    router.push("/administrativo/produtos");
  }, [router]);

  return (
    <div>
      <div className="bg-white rounded-xl w-full h-36 mt-5 flex justify-center items-center flex-col">
        <div onClick={toProducts} className="hover:opacity-80 flex transition ease-in duration-200 flex-col justify-center items-center">
          <div className="cursor-pointer bg-purple w-16 h-16 rounded-full flex justify-center ">
            <Image src={IpeBag} alt="IpeBag" />
          </div>
          <p className="mt-2 flex cursor-pointer">
            Ver todos seus produtos
            <Image className="ml-3" src={IpeIr} alt="IpeIr" />
          </p>
        </div>
      </div>
    </div>
  );
}
