// Plugin Npm Node.js (jsonwebtoken & mysql)
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

// Connexion à la database : 
const connectdb = require('../database/connection-db');

// Recuparation de l'ensemble des posts :
exports.getAllPosts = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'serBsSjzVclhImFAF6UNLCHlH6pvh3Fr');
    const mod = decodedToken.moderation;
    // Si l'utilisateur possède les droits d'Admin :
    if(mod == 1) {
        let sql = `SELECT posts.id, posts.userId, posts.content,
        DATE_FORMAT(posts.date_creation, '%d/%m/%Y à %H:%i:%s') AS date, posts.likes, 
        users.lastName, users.firstName 
        FROM posts JOIN users 
        ON posts.userId = users.id 
        ORDER BY posts.date_creation DESC`;
        new Promise((resolve, reject) =>{
            connectdb.query(sql, function (err, result, fields) {
                if (err) reject({ err })
                resolve(result)
            });
        })
        .then(response => res.status(201).json({ response }))
        .catch(error => res.status(400).json({ error }));
    }
    else {
        res.status(400).json({error: 'Requête non autorisée'})
    }
}

// Suppression d'un post :
exports.deletePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'serBsSjzVclhImFAF6UNLCHlH6pvh3Fr');
    const mod = decodedToken.moderation;
    if(mod == 1){
        let postId = req.params.id;
        let sqlInserts = [postId];
        let sql = 'DELETE FROM posts WHERE id = ?';
        sql = mysql.format(sql, sqlInserts);
        new Promise((resolve) =>{
            connectdb.query(sql, function (err, result){
                if (err) reject({ err });
                resolve({message : 'Post supprimé !'});
            })
        })
        .then(response => res.status(204).json({ response }))
        .catch(error => res.status(400).json({ error }));
    }
}

// Recuperation de tous les commentaires :
exports.getAllComments = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'serBsSjzVclhImFAF6UNLCHlH6pvh3Fr');
    const mod = decodedToken.moderation;
    if(mod == 1){
        let sql = `SELECT comments.content, DATE_FORMAT(comments.date_creation, '%d/%m/%Y à %H:%i:%s') AS date,
            comments.id, comments.userId, users.firstName, users.lastName
            FROM comments JOIN users 
            ON comments.userId = users.id 
            ORDER BY date_creation DESC`;
        new Promise((resolve, reject) =>{
            connectdb.query(sql, function (err, result, fields){
                if (err) reject({ err });
                resolve(result);
            })
        })
        .then(response => res.status(200).json({ response }))
        .catch(error => res.status(400).json({ error }));
    }
}

// Suppression d'un commentaire :
exports.deleteComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'serBsSjzVclhImFAF6UNLCHlH6pvh3Fr');
    const mod = decodedToken.moderation;
    if (mod == 1) {
        let commentId = req.params.id;
        let sqlInserts = [commentId];
        let sql = 'DELETE FROM comments WHERE id = ?';
        sql = mysql.format(sql, sqlInserts);
        new Promise((resolve) =>{
            connectdb.query(sql, function (err, result, fields){
                if (err) throw err;
                resolve({message : 'Commentaire supprimé !'});
            })
        })
        .then(response => res.status(204).json({ response }))
        .catch(error => res.status(400).json({ error }));
    }
}
