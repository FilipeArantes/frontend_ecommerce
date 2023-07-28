import IpePessoa from "@/src/assets/images/pessoabanner.png";
import Image from "next/image";

export default function Banner() {
  return (
    <div className="flex flex-row mb-11">
      <div className="w-full mt-14 h-[17rem] bg-gradient-to-r from-[#290064] to-[#42019f] p-[2.7rem]">
        <h1 className="text-white text-6xl">
          <span className="text-orange">30%</span> DE DESCONTO EM TODO O SITE!
        </h1>
        <div className="text-white text-4xl mt-8">
          Tá esperando o que?
          <br /> Venha e garanta já o seu produto!
        </div>
        <div>
          {/* <Image src={IpePessoa} alt="IpePessoa" height={270} /> */}
        </div>
      </div>
    </div>
  );
}
