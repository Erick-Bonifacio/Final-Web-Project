//requiring basic tools
const express = require('express'); 
const fs = require('fs');
const path = require('path');
const router = express.Router();

//requiring extra tools
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// databank path and connection
const pathUsers = path.join(__dirname,'..','db','users.json');
const users = JSON.parse(fs.readFileSync(pathUsers, {encoding: 'utf-8'}));


const generateHash = function () 
{
    return crypto.randomBytes(16).toString('hex');
}


router.get('/users', autenticarToken, (req, res) => {
    res.status(200).json(users);
});


router.get('/list-assets', autenticarToken, (req, res) => {
    
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


router.get('/get-asset', autenticarToken, (req, res) => {
    
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


router.post('/add-asset', autenticarToken, (req, res) => {

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


router.put('/update-asset', autenticarToken, (req, res) => {

    console.log('ENTROU OUAH!')

    const {idUser, idAsset, data, sigla, setor, preco, cotas} = req.body;

    let userFound = false;
    let assetFound = false;

    for(let user of users){
        if(user.idUser == idUser){
            userFound = true;
            for(let asset of user.assets){
                if(asset.idAsset == idAsset){
                    if (data) asset.data = data;
                    if (sigla) asset.sigla = sigla;
                    if (setor) asset.setor = setor;
                    if (preco) asset.preco = preco;
                    if (cotas) asset.cotas = cotas;
                    assetFound = true;
                    break;
                }
            }
            break;
        }
    }

    if(userFound && assetFound){
        fs.writeFileSync(pathUsers, JSON.stringify(users, null, 2));
        res.status(200).send('OK');
    } else if (!userFound) {
        res.status(404).send('USER_NOT_FOUND');
    } else {
        res.status(404).send('ASSET_NOT_FOUND');
    }
});


router.post('/add-user', autenticarToken, (req, res) => {
    
    const {nome, dataNascimento, rua, bairro, email, senha} = req.body;
    
    let idUser = generateHash();
    
    const newUser = {
        idUser : idUser,
        nome : nome,
        dataNascimento : dataNascimento,
        rua: rua,
        bairro: bairro,
        email : email,
        senha : senha,
        assets : []
    }
    
    users.push(newUser);
    
    fs.writeFileSync(pathUsers, JSON.stringify(users, null, 2));
    res.status(200).send(JSON.stringify({id : idUser, status : 'OK'}));
   
});


router.delete('/delete-user', autenticarToken, (req, res) => {
    
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


router.put('/update-user', autenticarToken, (req, res) => {
    const { idUser, nome, dataNascimento, rua, bairro, email, senha } = req.body;

    // Encontra o índice do usuário no array users
    const userIndex = users.findIndex((u) => u.idUser.toString() === idUser.toString());

    if (userIndex === -1) {
        return res.status(404).send('USER_NOT_FOUND');
    }

    let updateUser = {
        idUser : idUser,
        nome : nome,
        dataNascimento : dataNascimento,
        rua: rua,
        bairro: bairro,
        email : email,
        senha : senha,
        assets : users[userIndex].assets
    }

    users[userIndex] = updateUser;

    try {
        fs.writeFileSync(pathUsers, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error('Erro ao escrever no arquivo users.json:', error);
        return res.status(500).send('Erro ao salvar os dados do usuário');
    }

    res.status(200).json(users[userIndex]);
});

function autenticarToken(req,res,next){
    const authH = req.headers['authorization'];
    const token = authH && authH.split(' ')[1];
    if(token === null) return res.status(401).send('Token não encontrado');
    
    try {
        const user = jwt.verify(token, process.env.TOKEN);
        req.user = user;
        next();
    } catch (error) {
        res.status(403).send('Token inválido');
    }
}

module.exports = router;