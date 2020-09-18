// Plugin Npm Node.js (bcrypt, jsonwebtoken & mysql)
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');

// Connexion à la bade de donnée
const connectdb = require('../database/connection-db');

// Regex afin de limiter les saisie pour éviter les attaques par injection 
const regexFirstName = /^[A-Za-zàâäéèêëïîôöùûüç]+([-']{1}[A-Za-zàâäéèêëïîôöùûüç]+)*$/
const regexLastName = /^[A-Za-zàâäéèêëïîôöùûüç]+([ \-']{1}[A-Za-zàâäéèêëïîôöùûüç]+)*$/
const regexEmail = /[A-Za-z0-9_'~-]+(?:\.[A-Za-z0-9_'~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[a-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?/
const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
const regexSpace = /^[ ]+$/

// Création d'un nouvel utilisateur
exports.signup = (req, res, next) => {
    if ( req.body.firstName == '' || req.body.lastName == '' || req.body.email == '' || req.body.password == '' || regexSpace.test(req.body.firstName) || regexSpace.test(req.body.lastName) || regexSpace.test(req.body.email) || regexSpace.test(req.body.password)) {
        return res.status(500).json({ error: 'Des champs sont vides !' });
    }
    if (!regexFirstName.test(req.body.firstName) || !regexLastName.test(req.body.lastName) || !regexEmail.test(req.body.email) || !regexPassword.test(req.body.password)) {
        return res.status(500).json({ error: 'Des champs sont invalides' });
    }
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;

    bcrypt.hash(password, 10)
    .then(hash => {
        // Formatage SQL
        let sqlInserts = [firstName, lastName, email, hash];
        let sql = "INSERT INTO Users VALUES (NULL, ?, ?, ?, ?, NULL, 0)"
        sql =  mysql.format(sql, sqlInserts);
        // Promesse de connexion à la base de donnée
        new Promise((resolve, reject) => {
            connectdb.query(sql, (err, result) => {
                if (err) reject({err})
               resolve({message: "New User !"})
            })
        })
        .then(response => res.status(201).json({ response }))
        .catch(error => res.status(400).json({ error }));
    })
}

// Récupération d'un utilisateur déja existant dans la base de donnée
exports.login = (req, res, next) => {
    if (req.body.email == '' || req.body.password == '' || regexSpace.test(req.body.email) || regexSpace.test(req.body.password)) {
        return res.status(500).json({ error: 'Des champs sont vides' });
    }
    if (!regexEmail.test(req.body.email) || !regexPassword.test(req.body.password)) {
        return res.status(500).json({ error: 'Des champs sont invalides' });
    }
    let email = req.body.email;
    let password = req.body.password;
    let sqlInserts = [email];
    let sql = "SELECT * From Users WHERE email=?"
    sql = mysql.format(sql, sqlInserts);
    new Promise((resolve, reject) => {
        connectdb.query(sql, (err, result) => {
            if (err) reject({ err })
            if (!result) {
                reject({ message: "ID introuvable !"})
            }
            else {
                bcrypt.compare(password, result[0].password) 
                .then(valid => { 
                    if (!valid) return reject({ error: 'Mot de passe incorrect !' });
                    resolve({
                        userId: result[0].id,
                        token: jwt.sign(
                            { userId: result[0].id, moderation: result[0].modo },
                            'serBsSjzVclhImFAF6UNLCHlH6pvh3Fr',
                            { expiresIn: '24h' }
                        ),
                        moderation: result[0].modo
                    });
                })
            }
        })
    })
    .then(response => res.status(200).json({ response }))
    .catch(error => res.status(400).json({ error }));    
}

// Voir un profil d'utilisateur
exports.seeAProfile = (req, res, next) => {
    const userId = req.params.id;
    let sqlInserts = [userId];
    let sql = 'SELECT firstName, lastName, email FROM users WHERE id = ?';
    sql = mysql.format(sql,sqlInserts);
    new Promise((resolve, reject) =>{
        connectdb.query(sql, function(err, result){
            if (err) reject({ err });
            resolve(result);
        }) 
    })
    .then(response => res.status(200).json({ response }))
    .catch(error => res.status(400).json({ error }));    
}

// Mettre à jour son profil
exports.updateUser = (req, res, next) => {
    if ( req.body.firstName == '' || req.body.lastName == '' || req.body.email == '' || regexSpace.test(req.body.email) || regexSpace.test(req.body.firstName) || regexSpace.test(req.body.lastName) ) {
        return res.status(500).json({ error: 'Des champs sont vides' });
    }
    if (!regexFirstName.test(req.body.firstName) || !regexLastName.test(req.body.lastName) || !regexEmail.test(req.body.email)) {
        return res.status(500).json({ error: 'Des champs sont invalides' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'serBsSjzVclhImFAF6UNLCHlH6pvh3Fr');
    let userId = decodedToken.userId;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let sqlInserts = [firstName, lastName, email, userId];
    let sql = 'UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE id = ?';
    sql = mysql.format(sql,sqlInserts);
    new Promise((resolve, reject) =>{
        connectdb.query(sql, function(err, result){
            if (err) reject({ err });
            resolve({ result });
        }) 
    })
    .then(response => res.status(204).json({ response }))
    .catch(error => res.status(400).json({ error }));    
}

// Suppression d'un utilisateur
exports.deleteUser = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'serBsSjzVclhImFAF6UNLCHlH6pvh3Fr');
    const userId = decodedToken.userId;
    let sqlInserts = [userId];
    let sql = 'DELETE FROM users WHERE id = ?'; 
    sql = mysql.format(sql,sqlInserts);
    new Promise((resolve, reject) =>{
        connectdb.query(sql, function(err, result){
            if (err) return reject({ err });
            resolve({message : 'Utilisateur supprimé'});
        }) 
    })
    .then(response => res.status(204).json({ response }))
    .catch(error => res.status(400).json({ error }));    
}