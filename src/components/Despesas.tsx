import React from 'react';

interface DespesasProps {
  nome: string;
  valor: number;
}

const Despesas: React.FC<DespesasProps> = ({ nome, valor }) => {
  return (
    <div>
      <h3>{nome}</h3>
      <p>Valor: R$ {valor.toFixed(2)}</p>
    </div>
  );
};

export default Despesas;
