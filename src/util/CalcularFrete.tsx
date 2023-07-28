type FreteProps = {
  uf: string;
  valorProduto: number;
};

export function calcularFrete({ uf, valorProduto }: FreteProps): number {
  const faixasPorcentagem: { [key: string]: { min: number; max: number } } = {
    GO: { min: 0.15, max: 0.22 },
    SP: { min: 0.22, max: 0.3 },
    RO: { min: 0.26, max: 0.3 },
    AC: { min: 0.22, max: 0.28 },
    AM: { min: 0.2, max: 0.28 },
    RR: { min: 0.2, max: 0.25 },
    PA: { min: 0.22, max: 0.28 },
    AP: { min: 0.25, max: 0.32 },
    TO: { min: 0.24, max: 0.26 },
    MA: { min: 0.18, max: 0.25 },
    PI: { min: 0.22, max: 0.28 },
    CE: { min: 0.2, max: 0.25 },
    RN: { min: 0.25, max: 0.3 },
    PB: { min: 0.25, max: 0.3 },
    PE: { min: 0.2, max: 0.22 },
    AL: { min: 0.25, max: 0.32 },
    SE: { min: 0.22, max: 0.3 },
    BA: { min: 0.22, max: 0.28 },
    MG: { min: 0.2, max: 0.25 },
    ES: { min: 0.25, max: 0.3 },
    RJ: { min: 0.28, max: 0.35 },
    PR: { min: 0.22, max: 0.28 },
    SC: { min: 0.2, max: 0.25 },
    RS: { min: 0.25, max: 0.3 },
    MS: { min: 0.18, max: 0.22 },
    MT: { min: 0.18, max: 0.22 },
    DF: { min: 0.2, max: 0.35 },
  };

  const faixaPorcentagem = faixasPorcentagem[uf];
  if (faixaPorcentagem) {
    const randomValue =
      Math.random() * (faixaPorcentagem.max - faixaPorcentagem.min) +
      faixaPorcentagem.min;
    return valorProduto * randomValue;
  }
  return 0;
}
