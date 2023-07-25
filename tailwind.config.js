/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        white: "#fff",
        purple: "#4400A5",
        orange: "#FF8429",
        vermei: "#FE452C",
        slate: "#F5F5F5"
      },
      fontSize: {
        criar: "3.35em",
      },
      spacing: {
        teste: "32rem",
        criar: "450px",
        estoque: "35rem",
        nav: "20rem",
        estoqueAltura: "51rem",
        modalImageW: "35rem",
        modalImageH: "41rem",
        modalW: "78rem",
        modalH: "46rem",
        modalCatW: "44rem",
        modalCatH: "33rem",
        modalCatImageW: "36rem",
        adicionar: "37.rem",
        fecharR: "22rem",
        fechaT: "7.5rem",
        fecharCatR: "39rem",
        fecharCatT: "14.2rem",
      },
      minWidth: {
        nav: "20rem"
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
