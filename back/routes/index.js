//requiring basic tools
const express = require('express'); 
const cors = require('cors');
const fs = require('fs');
const path = require('path');

//requiring extra tools
const crypto = require('crypto');

// databank paths
const pathUsers = path.join(__dirname,'..','db','users.json');
const pathAssets = path.join(__dirname,'..','db','assets.json');

const users = JSON.parse(fs.readFileSync(pathUsers, {encoding: 'utf-8'}));
// const assets = JSON.parse(fs.readFileSync(pathAssets, {encoding: 'utf-8'}));

// initializing server
const app = express();
app.use(cors());

//Função para extrair os dados do pacote IP
app.use(express.json())

app.listen(8080, ()=>{
    console.log('Servidor On');
});


const generateHash = function () 
{
    return crypto.randomBytes(16).toString('hex');
}

app.get('/users', (req, res) => {
    res.status(200).json(users);
});

app.get('/list-assets', (req, res) => {
    
    const {idUser} = req.body;
    let assets = []

    // busca no banco 
    for(user of users){
        if (user.idUser == idUser){
            assets.push(user.assets)
        }
    }

    if(assets.length > 0){
        res.status(200).json(assets[0]);
    }
    else {
        res.status(404).send('USER_NOT_FOUND');
    }
});

app.get('/get-asset', (req, res) => {
    
    const {idUser, siglaAsset} = req.body;
    
    console.log(idUser)
    console.log(siglaAsset)

    // busca no banco
    let user = users.find((u) => u.idUser === idUser);
    let returnAsset = user ? user.assets.filter((a) => a.sigla === siglaAsset) : [];

    if(returnAsset){
        res.status(200).json(returnAsset);
    }
    else {
        res.status(404).send('USER_NOT_FOUND');
    }
});

app.post('/add-asset', (req, res) => {

    const {idUser, data, sigla, setor, preco, cotas} = req.body;

    let idAsset = generateHash();

    const newAsset = {
        idAsset,
        data,
        sigla,
        setor,
        preco,
        cotas
    }

    let userFound = false
    for(let user of users){
        if(user.idUser == idUser){
            user.assets.push(newAsset);
            userFound = true;
            break;
        }
    }
    
    if(userFound){
        fs.writeFileSync(pathUsers, JSON.stringify(users, null, 2));
        res.status(200).send('OK');
    } else {
        res.status(404).send('USER_NOT_FOUND');
    }
    
});


app.post('/add-user', (req, res) => {
    
    const {nome, dataNascimento, email, senha} = req.body;
    
    let idUser = generateHash();
    
    const newUser = {
        idUser : idUser,
        nome : nome,
        dataNascimento : dataNascimento,
        email : email,
        senha : senha,
        assets : []
    }
    
    users.push(newUser);
    
    fs.writeFileSync(pathUsers, JSON.stringify(users, null, 2));
    res.status(200).send(JSON.stringify({id : idUser, status : 'OK'}));
   
});

app.delete('/delete-user', (req, res) => {
    
    const {idUser} = req.body;

    let user = users.find((u) => u.idUser === idUser);
    
    if(user){
        users.pop(user);
        fs.writeFileSync(pathUsers, JSON.stringify(users, null, 2));
        res.status(200).json(user);
    }
    else {
        res.status(404).send('USER_NOT_FOUND');
    }
});

app.put('/update-user', (req, res) => {
    const { idUser, field, newInfo } = req.body;

    // Verifica se todos os campos necessários foram enviados no body
    if (!idUser || !field || !newInfo) {
        return res.status(400).send('Existem campos em branco!');
    }

    // Encontra o índice do usuário no array users
    const userIndex = users.findIndex((u) => u.idUser.toString() === idUser.toString());

    if (userIndex === -1) {
        return res.status(404).send('USER_NOT_FOUND');
    }

    switch (field) {
        case 'nome':
            users[userIndex].nome = newInfo;
            break;
        case 'dataNascimento':
            users[userIndex].dataNascimento = newInfo;
            break;
        case 'endereco':
            users[userIndex].endereco = newInfo;
            break;
        case 'email':
            users[userIndex].email = newInfo;
            break;
        case 'senha':
            users[userIndex].senha = newInfo;
            break;
        default:
            return res.status(400).send('Campo de atualização inválido');
    }

    try {
        fs.writeFileSync(pathUsers, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Erro ao escrever no arquivo users.json:', error);
        return res.status(500).send('Erro ao salvar os dados do usuário');
    }

    res.status(200).json(users[userIndex]);
});
