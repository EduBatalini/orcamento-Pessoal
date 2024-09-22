import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Entrada {
  nome: string;
  valor: number;
}

const Dashboard: React.FC = () => {
  const [rendas, setRendas] = useState<Entrada[]>([]);
  const [despesas, setDespesas] = useState<Entrada[]>([]);
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState<'renda' | 'despesa'>('renda'); // renda ou despesa
  const [editando, setEditando] = useState<number | null>(null); // Para rastrear se estamos editando uma entrada
  const [editandoTipo, setEditandoTipo] = useState<'renda' | 'despesa' | null>(null);

  // Adicionar ou editar uma entrada de renda ou despesa
  const adicionarOuEditarEntrada = () => {
    const valorNumero = parseFloat(valor);
    if (!isNaN(valorNumero) && nome.trim() !== '') {
      const novaEntrada = { nome, valor: valorNumero };

      if (editando !== null) {
        // Edição de uma entrada existente
        if (editandoTipo === 'renda') {
          const novasRendas = [...rendas];
          novasRendas[editando] = novaEntrada;
          setRendas(novasRendas);
        } else if (editandoTipo === 'despesa') {
          const novasDespesas = [...despesas];
          novasDespesas[editando] = novaEntrada;
          setDespesas(novasDespesas);
        }
        setEditando(null);
        setEditandoTipo(null);
      } else {
        // Adicionar uma nova entrada
        if (tipo === 'renda') {
          setRendas([...rendas, novaEntrada]);
        } else {
          setDespesas([...despesas, novaEntrada]);
        }
      }
      setNome('');
      setValor('');
    }
  };

  // Função para editar uma entrada existente
  const iniciarEdicao = (index: number, tipo: 'renda' | 'despesa') => {
    if (tipo === 'renda') {
      setNome(rendas[index].nome);
      setValor(rendas[index].valor.toString());
    } else {
      setNome(despesas[index].nome);
      setValor(despesas[index].valor.toString());
    }
    setEditando(index);
    setEditandoTipo(tipo);
  };

  // Função para excluir uma entrada
  const excluirEntrada = (index: number, tipo: 'renda' | 'despesa') => {
    if (tipo === 'renda') {
      setRendas(rendas.filter((_, i) => i !== index));
    } else {
      setDespesas(despesas.filter((_, i) => i !== index));
    }
  };

  // Preparar dados para o gráfico
  const nomesRenda = rendas.map(r => r.nome);
  const valoresRenda = rendas.map(r => r.valor);
  const nomesDespesa = despesas.map(d => d.nome);
  const valoresDespesas = despesas.map(d => d.valor);

  // Criar uma lista única de labels
  const allNomes = [...nomesRenda, ...nomesDespesa];
  const labels = Array.from(new Set(allNomes));

  const data = {
    labels,
    datasets: [
      {
        label: 'Renda',
        data: labels.map(label => valoresRenda[nomesRenda.indexOf(label)] || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Despesas',
        data: labels.map(label => valoresDespesas[nomesDespesa.indexOf(label)] || 0),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Comparativo de Rendas e Despesas',
      },
    },
  };

  return (
    <div>
      <h2>Dashboard Financeiro</h2>
      
      {/* Formulário para inserir renda ou despesa */}
      <div>
        <input 
          type="text" 
          placeholder="Nome" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Valor" 
          value={valor} 
          onChange={(e) => setValor(e.target.value)} 
        />
        <select value={tipo} onChange={(e) => setTipo(e.target.value as 'renda' | 'despesa')} disabled={editando !== null}>
          <option value="renda">Renda</option>
          <option value="despesa">Despesa</option>
        </select>
        <button onClick={adicionarOuEditarEntrada}>
          {editando !== null ? 'Salvar' : 'Adicionar'}
        </button>
        {editando !== null && <button onClick={() => { setEditando(null); setNome(''); setValor(''); }}>Cancelar</button>}
      </div>

      {/* Cards separados para Rendas e Despesas */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        {/* Card de Rendas */}
        <div style={{ flex: 1, marginRight: '10px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>Rendas</h3>
          {rendas.map((renda, index) => (
            <div key={index} style={{ border: '1px solid #75c', margin: '10px 0', padding: '10px' }}>
              <p>{renda.nome}: R$ {renda.valor.toFixed(2)}</p>
              <button onClick={() => iniciarEdicao(index, 'renda')}>Editar</button>
              <button onClick={() => excluirEntrada(index, 'renda')}>Excluir</button>
            </div>
          ))}
        </div>

        {/* Card de Despesas */}
        <div style={{ flex: 1, marginLeft: '10px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>Despesas</h3>
          {despesas.map((despesa, index) => (
            <div key={index} style={{ border: '1px solid #c75', margin: '10px 0', padding: '10px' }}>
              <p>{despesa.nome}: R$ {despesa.valor.toFixed(2)}</p>
              <button onClick={() => iniciarEdicao(index, 'despesa')}>Editar</button>
              <button onClick={() => excluirEntrada(index, 'despesa')}>Excluir</button>
            </div>
          ))}
        </div>
      </div>

      {/* Gráfico de Rendas e Despesas */}
      <div style={{ marginTop: '20px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
