import React from 'react';


const Home: React.FC = () => {
  return (
    <div className='home'>
      <h1>Bem-vindo ao Gerenciador de Orçamento Pessoal</h1>
      <p>O objetivo principal do aplicativo é permitir que os usuários registrem suas entradas de renda e despesas mensais, 
        oferecendo uma visão clara de sua situação financeira. Com isso, eles podem tomar decisões mais informadas sobre seus gastos
         e economias.
         Registro de Renda e Despesas: Adicione entradas de renda e despesas de forma simples, especificando valores, categorias e datas.

<br /><strong> Edição e Exclusão:</strong> Edite ou exclua entradas conforme necessário, mantendo suas informações sempre atualizadas.

<br /><strong>Dashboard:</strong> Visualize somatórias de renda e despesas, acompanhadas de gráficos que facilitam a compreensão da sua situação financeira.

<br /><strong>Resumo Financeiro:</strong> Acesse um resumo com total de renda, total de despesas e saldo restante para uma visão clara do desempenho financeiro.

<br /><strong>Autenticação de Usuário: </strong>Faça login usando contas do Google ou com e-mail e senha, garantindo a segurança das suas informações.

<br /><strong>Explicação sobre o Uso:</strong> Encontre orientações sobre como utilizar o aplicativo na página "Home".

<br /><strong>Informações sobre o Criador:</strong> Conheça o criador do aplicativo e suas motivações na página "Sobre".
         
         
         </p>
    </div>
  );
};

export default Home;
