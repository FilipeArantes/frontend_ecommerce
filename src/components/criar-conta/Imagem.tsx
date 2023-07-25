import Image from "next/image"
import Mulher from "@/src/assets/images/Mulher.svg"

export default function Imagem() {
    return(
        <aside className="ml-56">
          <Image
            src={Mulher}
            width={729}
            alt="Imagem Mulher"
          />
        </aside>
    )
}