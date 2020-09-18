// Plugin Npm Node.js (jsonwebtoken & mysql)
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

// Connexion à la database : 
const connectdb = require('../database/connection-db');

// Regex afin de limiter les saisies : 
const regexSpace = /^[ ]+$/

// Création d'un post :
exports.createPost = (req, res, next) => {
    if (req.body.content == '' || regexSpace.test(req.body.content)) {
        return res.status(500).json({ error: 'La publication semble vide !' });
    }
    else {
        let content = req.body.content;
        let userId = req.body.userId;
        let sqlInserts = [userId, content];
        let sql = "INSERT INTO Posts VALUES(NULL, ?, NOW(), NOW(), ?, 0, NULL)";
        sql = mysql.format(sql, sqlInserts);
        new Promise((resolve, reject) => {
            connectdb.query(sql, (err, result) => {
                if (err) reject({err})
                resolve({message: "New Post !"})
            })
        })
        .then(response => res.status(201).json({ response }))
        .catch(error => res.status(400).json({ error }));
    }
}

// Affichage de tous les posts :
exports.getAllPosts = (req, res, next) => {
    let sql = `SELECT posts.id, posts.userId, posts.content,
    DATE_FORMAT(DATE(posts.date_creation), '%d/%m/%Y') AS date, TIME(posts.date_creation) AS time, posts.likes,
    users.lastName, users.firstName 
    FROM posts JOIN users 
    ON posts.userId = users.id 
    ORDER BY posts.date_creation DESC`;
    new Promise((resolve, reject) =>{
        connectdb.query(sql, function (err, result) {
            if (err) reject({ err });
            for (i = 0; i < result.length; i++) {
                if (result[i].content == '') {
                    console.log('coucou')
                }
            }
            resolve(result)
            
        });
    })
    .then (response => res.status(200).json({ response } ))
    .catch (error => res.status(400).json({ error } ))
}

// Voir un post :
exports.getAPosts = (req, res, next) => {
    let sql = `SELECT posts.id, posts.userId, posts.content,
    DATE_FORMAT(DATE(posts.date_creation), '%d/%m/%Y') AS date, TIME(posts.date_creation) AS time, posts.likes,
    users.lastName, users.firstName 
    FROM posts JOIN users 
    ON posts.userId = users.id 
    WHERE posts.id = ?
    ORDER BY posts.date_creation DESC`;
    const postId = req.params.id
    let sqlInserts = [postId]
    sql = mysql.format(sql, sqlInserts);
    new Promise((resolve, reject) =>{
        connectdb.query(sql, function (err, result) {
            if (err) reject({err});
            resolve(result)
        });
    })
    .then (response => res.status(200).json({ response } ))
    .catch (error => res.status(400).json({ error } ))
}

// Mis à jour de son post :
exports.updatePost = (req, res, next) => {
    if (req.body.content == '' || regexSpace.test(req.body.content)) {
        return res.status(500).json({ error: 'Il semble que votre publication soit vide !' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'serBsSjzVclhImFAF6UNLCHlH6pvh3Fr');
    const userId = decodedToken.userId;
    let content = req.body.content;
    let postId = req.params.id;
    let sqlInserts1 = [postId];
    let sqlInserts2 = [content, postId, userId];    
    let sql1 = 'SELECT * FROM posts where id = ?';
    sql1 = mysql.format(sql1, sqlInserts1);
    new Promise((resolve, reject) =>{
        connectdb.query(sql1, function (err, result){
            if ( err ) reject({err});

            if ( sqlInserts2[2] == result[0].userId ) {
                let sql2 = 'UPDATE posts SET content = ? WHERE id = ? AND userId = ?';
                sql2 = mysql.format(sql2, sqlInserts2);
                connectdb.query(sql2, function (err, result){
                    if (err) reject({ err });
                    resolve({message : 'Post modifié !'});
                })
            }
            else {
                reject({error: 'fonction indisponible'});
            }
        })
    })
    .then(response => res.status(201).json( response ))
    .catch(error => res.status(400).json( error ))
}

// Suppression de son post :
exports.deletePost = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'serBsSjzVclhImFAF6UNLCHlH6pvh3Fr');
    const userId = decodedToken.userId;
    let postId = req.params.id;
    let sqlInserts1 = [postId];
    let sqlInserts2 = [postId, userId];
    let sql1 = 'SELECT * FROM posts where id = ?';
    sql1 = mysql.format(sql1, sqlInserts1);
    new Promise((resolve, reject) =>{
        connectdb.query(sql1, function (err, result){
            if (err) reject({ err });

            if(sqlInserts2[1] == result[0].userId){
                let sql2 = 'DELETE FROM posts WHERE id = ? AND userId = ?';
                sql2 = mysql.format(sql2, sqlInserts2);
                connectdb.query(sql2, function (err, result){
                    if (err) reject({ err });
                    resolve({message : 'Post supprimé !'});
                })
            }
            else {
                reject({error: 'fonction indisponible'});
            }
        });
    })
    .then(response => res.status(204).json({ response }))
    .catch(error => res.status(400).json({ error }));
}

// Creation d'un commentaire
exports.createComment = (req, res, next) => {
    if (req.body.content == '' || regexSpace.test(req.body.content)) {
        return res.status(500).json({ error: 'Il semble que votre publication est vide !' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'serBsSjzVclhImFAF6UNLCHlH6pvh3Fr');
    const userId = decodedToken.userId;
    let postId = req.params.id;
    let content = req.body.content;
    let sqlInserts = [userId, postId, content];
    let sql = 'INSERT INTO comments VALUES(NULL, ?, ?, NOW(), ?, 0, NULL)';
    sql = mysql.format(sql, sqlInserts);
    new Promise((resolve, reject) => {
        connectdb.query(sql, function (err, result){
            if (err) reject({ err });
            resolve({message : 'Nouveau commentaire !'})
        })
    })
    .then(response => res.status(201).json(JSON.stringify(response)))
    .catch ( error => res.status(400).json({ error }));  
}

// voir un commentaire
exports.getComments = (req, res, next) => {
    let postId = req.params.id;
    let sqlInserts = [postId];
    let sql = `SELECT comments.content, DATE_FORMAT(comments.date_creation, '%d/%m/%Y à %H:%i:%s') AS date, comments.id,
    comments.userId, users.firstName, users.lastName 
    FROM comments 
    JOIN users ON comments.userId = users.id 
    WHERE postId = ? ORDER BY date`;
    sql = mysql.format(sql, sqlInserts);
    new Promise((resolve, reject) =>{
        connectdb.query(sql, function (err, result){
            if (err) reject({ err });
            resolve(result);
        })
    })
    .then(response => res.status(200).json( response))
    .catch ( error => res.status(400).json({ error }));  
}

// Mis à jour d'un commentaire
exports.updateComment = (req, res, next) => {
    if (req.body.content == '' || regexSpace.test(req.body.content)) {
        return res.status(500).json({ error: 'Il semble que votre publication est vide !' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'serBsSjzVclhImFAF6UNLCHlH6pvh3Fr');
    const userId = decodedToken.userId;
    let content = req.body.content;
    let commentId = req.params.id;
    let sqlInserts1 = [commentId];
    let sqlInserts2 = [content, commentId, userId];
    let sql1 = 'SELECT * FROM comments where id = ?';
    sql1 = mysql.format(sql1, sqlInserts1);
    new Promise((resolve, reject) =>{
        connectdb.query(sql1, function (err, result, fields){
            if (err) reject({ err });
            if(sqlInserts2[2] == result[0].userId) {
                let sql2 = 'UPDATE comments SET content = ? WHERE id = ? AND userId = ?';
                sql2 = mysql.format(sql2, sqlInserts2);
                connectdb.query(sql2, function (err, result){
                    if (err) throw err;
                    resolve({message : 'Commentaire modifié !'});
                })
            }
            else {
                reject({error: 'fonction indisponible'});
            }
        })
    })
    .then( response => res.status(204).json( response ))
    .catch ( error => res.status(400).json({ error }));  
}

// Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'serBsSjzVclhImFAF6UNLCHlH6pvh3Fr');
    const userId = decodedToken.userId;
    let commentId = req.params.id;
    let sqlInserts1 = [commentId];
    let sqlInserts2 = [commentId, userId];
    let sql1 = 'SELECT * FROM comments where id = ?';
    sql1 = mysql.format(sql1, sqlInserts1);
    new Promise((resolve, reject) =>{
        connectdb.query(sql1, function (err, result){
            if (err) reject({ err });

            if(sqlInserts2[1] == result[0].userId){
                let sql2 = 'DELETE FROM comments WHERE id = ? AND userId = ?';
                sql2 = mysql.format(sql2, sqlInserts2);
                connectdb.query(sql2, function (err, result, fields){
                    if (err) reject({ err });
                    resolve({message : 'Commentaire supprimé !'});
                })
            }
            else {
                reject({error: 'fonction indisponible'});
            }
        });
    })
    .then(response => res.status(200).json( response))
    .catch ( error => res.status(400).json({ error }));  
}