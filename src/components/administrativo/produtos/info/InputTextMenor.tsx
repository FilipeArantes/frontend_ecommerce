type InputTextMenorProps = {
  text: string;
  idName: string;
  placeholder: string;
  onChange: (e:any) => void;
};

export default function InputTextMenor({
  text,
  idName,
  placeholder,
  onChange,
}: InputTextMenorProps) {
  return (
    <>
      <div className="w-72">
        <label className="mb-2" htmlFor={idName}>
          {text}
        </label>
        <input
          onChange={onChange}
          className="w-full p-2 rounded-lg"
          type="text"
          id={idName}
          placeholder={placeholder}
        />
      </div>
    </>
  );
}
