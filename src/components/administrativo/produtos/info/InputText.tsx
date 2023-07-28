type InputTextMenorProps = {
  text: string;
  idName: string;
  placeholder: string;
  onChange: (e: any) => void;
};

export default function InputText({
  text,
  idName,
  placeholder,
  onChange,
}: InputTextMenorProps) {
  return (
    <>
      <label className="mb-2" htmlFor={idName}>
        {text}
      </label>
      <input
        required
        onChange={onChange}
        className="w-full p-2 rounded-lg"
        type="text"
        id={idName}
        placeholder={placeholder}
      />
    </>
  );
}
