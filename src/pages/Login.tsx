// src/components/Login.tsx
import React, { useState } from 'react';
import { auth, googleProvider } from '../FirebaseConfig';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const [isCadastro, setIsCadastro] = useState(false);
  const navigate = useNavigate(); // Para redirecionamento

  // Função de login com Google
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('Usuário logado com Google:', user);
      navigate('/dashboard'); // Redireciona após o login
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error);
    }
  };

  // Função de login ou cadastro com email e senha
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isCadastro) {
        // Cadastro de novo usuário
        await createUserWithEmailAndPassword(auth, email, senha);
        console.log('Usuário cadastrado com sucesso');
        navigate('/dashboard'); // Redireciona após cadastro
      } else {
        // Login com email e senha
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;
        console.log('Usuário logado com email:', user);
        navigate('/dashboard'); // Redireciona após login
      }
    } catch (error) {
      setMensagemErro(isCadastro ? 'Erro ao cadastrar com email e senha.' : 'Erro ao fazer login com email e senha.');
      console.error('Erro ao processar:', error);
    }
  };

  // Alternar entre cadastro e login
  const toggleCadastro = () => {
    setIsCadastro(!isCadastro);
    setMensagemErro(''); // Limpa a mensagem de erro ao alternar entre login/cadastro
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isCadastro ? 'Cadastro' : 'Login'}</h2>
        <form onSubmit={handleEmailLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Senha:</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <button type="submit">{isCadastro ? 'Cadastrar' : 'Login com Email'}</button>
          {mensagemErro && <p>{mensagemErro}</p>}
        </form>
        <button className="google-login-button" onClick={handleGoogleLogin}>
          Login com Google
        </button>
        <button className="toggle-button" onClick={toggleCadastro}>
          {isCadastro ? 'Já tem uma conta? Faça Login' : 'Não tem uma conta? Cadastre-se'}
        </button>
      </div>
    </div>
  );
};

export default Login;
