import React, { useState } from 'react';
import '../styles/LoginStyle.css';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Adicione a lógica de autenticação aqui
    console.log('Username:', username);
    console.log('Password:', password);
  };

  const navigate = (e) => {
    navigate('/create-user');
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
        <button type="submit">Login</button>
      </form>
      <a href="/create-user" id='new-user' onClick={navigate}>Não possui cadastro?</a>
    </div>
  );
};

