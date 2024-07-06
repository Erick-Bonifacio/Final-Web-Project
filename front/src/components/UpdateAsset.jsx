import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginStyle.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"; 
import "../styles/updateAsset.css";


const schema = yup.object({
  idAsset: yup.string().required('ID do Asset obrigatório'),
  data: yup.string().required('Data obrigatória'),
  sigla: yup.string().required('Sigla obrigatória'),
  setor: yup.string().required('Setor obrigatório'),
  preco: yup.number().required('Preço obrigatório').positive('Preço deve ser positivo'),
  cotas: yup.number().required('Cotas obrigatórias').positive('Cotas devem ser positivas'),
}).required();

export default function UpdateAsset() {

    const [id, setId] = useState('');
    const [data, setData] = useState('');
    const [sigla, setSigla] = useState('');
    const [setor, setSetor] = useState('');
    const [preco, setPreco] = useState('');
    const [cotas, setCotas] = useState('');

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    async function autenticate(data){
        const response = await axios.post('http://localhost:8080/auth/login', data);
        if(response.status != 200){
            return false;
        }
        return true;
    }

    const onSubmit = async (data) => {
        let userExist = true; //autenticate(data);
        if(userExist){
            let boolConfirmation = confirm("Você deseja atualizar sua asset?");
            if(boolConfirmation){
                // pegar idUser do jwt? ou var global?
                let idUser = "763c9773b8dab61698ab4b81536911b2";
                const response = await axios.put('http://localhost:8080/usersroute/update-asset', idUser);
                if(response.status == 200){
                    alert("Asset atualizada com sucesso!")
                    navigate('/home');
                } else {
                    alert("Ocorreu um erro ao atualizar sua asset!");
                }
            }
        }
    };

    const navigateListAssets = () => {
        navigate('/home');
    }

    return (
        <div className="update-asset-container">
          <h2>Atualizar Asset</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
              <label htmlFor="idAsset">ID do Asset</label>
              <input
                type="text"
                id="idAsset"
                placeholder='ID do Asset'
                {...register('idAsset')}
              />
              <p className='erro'>{errors.idAsset?.message}</p>
            </div>
            <div className="input-group">
              <label htmlFor="data">Data</label>
              <input
                type="text"
                id="data"
                placeholder='Data'
                {...register('data')}
              />
              <p className='erro'>{errors.data?.message}</p>
            </div>
            <div className="input-group">
              <label htmlFor="sigla">Sigla</label>
              <input
                type="text"
                id="sigla"
                placeholder='Sigla'
                {...register('sigla')}
              />
              <p className='erro'>{errors.sigla?.message}</p>
            </div>
            <div className="input-group">
              <label htmlFor="setor">Setor</label>
              <input
                type="text"
                id="setor"
                placeholder='Setor'
                {...register('setor')}
              />
              <p className='erro'>{errors.setor?.message}</p>
            </div>
            <div className="input-group">
              <label htmlFor="preco">Preço</label>
              <input
                type="number"
                id="preco"
                placeholder='Preço'
                {...register('preco')}
              />
              <p className='erro'>{errors.preco?.message}</p>
            </div>
            <div className="input-group">
              <label htmlFor="cotas">Cotas</label>
              <input
                type="number"
                id="cotas"
                placeholder='Cotas'
                {...register('cotas')}
              />
              <p className='erro'>{errors.cotas?.message}</p>
            </div>
            <button type="submit">Atualizar Asset</button>
          </form>
          <a href="/home" id="home">Voltar para Home</a>
        </div>
      );
}
