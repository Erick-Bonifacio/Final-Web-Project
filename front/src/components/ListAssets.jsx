import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/listAssets.css';

export default function ListAssets() {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssets = async () => {
            const idUser = localStorage.getItem('id');
            const token = localStorage.getItem('token');

            if (!idUser || !token) {
                setError('Usuário não autenticado');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/usersroute/list-assets/${idUser}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                console.log('Response from API:', response);

                if (response.status === 200) {
                    if (response.data.length > 0) {
                        setAssets(response.data);
                    } else {
                        setError('Você não possui assets.');
                    }
                } else {
                    setError('Erro ao buscar assets');
                }
            } catch (error) {
                console.error('Erro ao buscar assets:', error);
                setError(error.response ? error.response.data : 'Erro ao buscar assets');
            } finally {
                setLoading(false);
            }
        };

        fetchAssets();
    }, []);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="assets-list">
            {/* <h1>Seus Assets</h1> */}
            {assets.length > 0 ? (
                <ul>
                    {assets.map((asset, index) => (
                        <li key={index} className="asset-item">
                            <div><strong>Data:</strong> {asset.data}</div>
                            <div><strong>Sigla:</strong> {asset.sigla}</div>
                            <div><strong>Setor:</strong> {asset.setor}</div>
                            <div><strong>Preço:</strong> {asset.preco}</div>
                            <div><strong>Cotas:</strong> {asset.cotas}</div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Você não possui assets.</p>
            )}
        </div>
    );
}
