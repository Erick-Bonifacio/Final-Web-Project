import React, { useState } from 'react';
import '../styles/LoginStyle.css';
import { Navigate } from 'react-router-dom';

export default function CreateUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Adicione a lógica de autenticação aqui
    console.log('Username:', username);
    console.log('Password:', password);
  };

  let nav = 0;
  const navigate = (e) => {
    nav = 1;
  }

  if(nav == 1){
    return <Navigate to='/create-user'/>;
  }

  return (
    <div className="signup-container">
      <h2>Preencha os dados para se cadastrar</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            placeholder='fulano de tal'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Data de Nascimento</label>
          <input
            type="password"
            id="password"
            placeholder='senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
      <a href="" id='new-user' onClick={navigate}>Não possui cadastro?</a>
    </div>
  );
};

