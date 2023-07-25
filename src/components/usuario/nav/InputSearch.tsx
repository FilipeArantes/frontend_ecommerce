type InputSearchProps = {
  onChange: (e:any) => void;
}

export default function InputSearch({onChange}: InputSearchProps) {
  return (
    <div>
      <input className="p-2 w-[31rem] bg-gray-100 rounded-lg" placeholder="Pesquise por..." type="search" onChange={onChange} />
    </div>
  );
}
