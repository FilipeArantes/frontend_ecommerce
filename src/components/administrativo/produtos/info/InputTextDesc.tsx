type InputTextDescProps = {
    text: string;
    idName: string;
    placeholder: string;
    onChange: (e: any) => void;
  };
  
  export default function InputTextDesc({
    text,
    idName,
    placeholder,
    onChange,
  }: InputTextDescProps) {
    return (
      <>
        <label className="mb-2" htmlFor={idName}>
          {text}
        </label>
        <textarea
          required
          onChange={onChange}
          className="w-full p-2 rounded-lg h-[19.5rem]"
          id={idName}
          placeholder={placeholder}
        />
      </>
    );
  }
  