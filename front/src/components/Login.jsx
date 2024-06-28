import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginStyle.css';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Adicione a lógica de autenticação aqui
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const navigateNewUser = (e) => {
    navigate('/create-user');
  }

  const autenticate = (e) => {
    //autenticar e se sucesso ele login
    const users = axios.get("http://localhost:8080/users");
    

  }

  const login = (e) => {
    navigate('/list-assets')
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            id="username"
            placeholder='exemplo@exemplo.com'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder='senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" onClick={autenticate}>Login</button>
      </form>
      <a href="/create-user" id='new-user' onClick={navigateNewUser}>Não possui cadastro?</a>
    </div>
  );
};

