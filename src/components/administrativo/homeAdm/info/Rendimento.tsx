import IpeDinheiro from "@/src/assets/icones/ipe-dinheiro.svg";
import Image from "next/image";

export default function Rendimento() {
  return (
    <div className="flex bg-white w-72 h-28 rounded-xl items-center">
      <div className="flex p-3">
        <div className="bg-purple w-16 h-16 rounded-full flex justify-center">
          <Image src={IpeDinheiro} alt="IpePedidos" />
        </div>
        <div>
          <p className="ml-5 text-gray-400 text-base">Rendimento Total</p>
          <div className="ml-5 text-xl">22,5</div>
        </div>
      </div>
    </div>
  );
}
