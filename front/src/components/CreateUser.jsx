import React, { useState, useEffect } from 'react';
import '../styles/CreateUserStyle.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateUser() {
  const [username, setUsername] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [quarter, setQuarter] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setNewUser({
      nome: username,
      dataNascimento: birthdate,
      rua: street,
      bairro: quarter,
      email: email,
      senha: passwordOne,
    });
  }, [username, birthdate, street, quarter, email, passwordOne]);

  const [newUser, setNewUser] = useState({
    nome: username,
    dataNascimento: birthdate,
    rua: street,
    bairro: quarter,
    email: email,
    senha: passwordOne,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (passwordOne !== passwordTwo) {
      alert("Senhas não conferem!");
      return;
    }

    try {
      const resposta = await axios.post('http://localhost:8080/add-user', newUser);
      if (resposta.status === 200)
        setMsg('OK');
    } catch (error) {
      console.log(error);
    }

    alert("Conta criada com sucesso!");
    navigate('/');
  };

  const fetchAddress = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setStreet(data.logradouro);
        setQuarter(data.bairro);
      } else {
        setStreet('');
        setQuarter('');
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setStreet('');
      setQuarter('');
    }
  };

  const handleCepChange = (e) => {
    const cep = e.target.value;
    setCep(cep);
    if (cep.length === 8) {
      fetchAddress(cep);
    } else {
      setStreet('');
      setQuarter('');
    }
  };

  return (
    <div className="create-user-container">
      <h2>Insira os dados para se cadastrar</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Nome</label>
          <input
            type="text"
            id="username"
            value={username}
            placeholder='fulano de tal'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder='exemplo@exemplo'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="birthdate">Data de Nascimento</label>
          <input
            type="date"
            id="birthdate"
            value={birthdate}
            placeholder='01/01/2000'
            onChange={(e) => setBirthdate(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="cep">CEP</label>
          <input
            type="text"
            id="cep"
            value={cep}
            placeholder='00.000-000'
            onChange={handleCepChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="street">Rua</label>
          <input
            type="text"
            id="street"
            value={street}
            placeholder='rua dos bobos'
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="quarter">Bairro</label>
          <input
            type="text"
            id="quarter"
            value={quarter}
            placeholder='bairro'
            onChange={(e) => setQuarter(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password-one">Senha</label>
          <input
            type="password"
            id="password-one"
            value={passwordOne}
            placeholder='senha'
            onChange={(e) => setPasswordOne(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password-two">Confirmar Senha</label>
          <input
            type="password"
            id="password-two"
            value={passwordTwo}
            placeholder='confirme a senha'
            onChange={(e) => setPasswordTwo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create User</button>
      </form>
      <a href="/" id="login">Fazer Login</a>
    </div>
  );
}
