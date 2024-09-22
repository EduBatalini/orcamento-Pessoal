import React from 'react';

interface RendaProps {
  nome: string;
  valor: number;
}

const Renda: React.FC<RendaProps> = ({ nome, valor }) => {
  return (
    <div>
      <h3>{nome}</h3>
      <p>Valor: R$ {valor.toFixed(2)}</p>
    </div>
  );
};

export default Renda;
