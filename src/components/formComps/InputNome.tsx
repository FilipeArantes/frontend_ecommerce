type InputProps = {
    label: string;
    nome: string;
    type: string;
    placeHolder: string;
    value: any;
    onChange: any;
}

export default function InputNome({label, nome, type, placeHolder, value, onChange}: InputProps) {
    return(
        <div className="flex flex-col py-3">
        <label htmlFor={nome}>{label}</label>
        <input
          name={nome}
          id={nome}
          className="rounded-lg pl-3 bg-gray-100 w-60 h-12 "
          type={type}
          placeholder={placeHolder}
          value={value}
          onChange={onChange}
          required
        />
      </div>
    )
}