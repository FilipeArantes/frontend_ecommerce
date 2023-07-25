type NavSuperiorProps = {
    pageName: string
}

export default function NavSuperior({pageName}: NavSuperiorProps) {
    return(
        <div className="flex">
          <h1 className="text-3xl w-full mb-14">{pageName}</h1>
        </div>
    )
}
