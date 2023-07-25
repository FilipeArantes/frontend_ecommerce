export default function Button({onClick, text}: any) {
  return (
    <button
      className="text-2xl bg-gradient-to-br from-purple to-orange w-teste text-white rounded-lg h-16 mt-6 transition ease-in duration-300 hover:opacity-90"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
