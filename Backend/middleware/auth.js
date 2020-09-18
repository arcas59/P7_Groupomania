// Plugin Npm Node.js (jsonwebtoken & mysql)
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
// Connexion à la database : 
const connectdb = require('../database/connection-db.js');

// Création du token d'authentification
module.exports = (req, res, next) => {
    try {
        // Vérification identité avec jsonwebtoken :
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'serBsSjzVclhImFAF6UNLCHlH6pvh3Fr');
        const userId = decodedToken.userId;
        // Formatage de la requête SQL :
        let sqlInserts = [userId];
        let sql = 'SELECT COUNT(id) FROM users WHERE id=?';
        sql = mysql.format(sql, sqlInserts);
        // Requête envoyé à la base de donnée :
        connectdb.query(sql, function( err, result ){
            // Si error :
            if (err) reject( { error : "Erreur dans l'inscription" });

            // Si le token.userId n'est pas dans la base de donnée :
            if (result[0]['COUNT(id)'] !== 1) {
                throw 'Token invalide';
            } 

            // Alors : 
            else {
                next();
            }
        })
    }
    // Si problème d'authentification :
    catch (error) {
        res.status(401).json({error: error | 'Requête non authentifiée!'})
    }
}; 