const bdd = require('../mysqlConfig');
const fs = require('fs');
const bcrypt = require('bcrypt'); 

exports.updateAvatar = (req, res, next) => {

    let avatarToUpload = `${req.protocol}://${req.get('host')}/profiles/${req.file.filename}`
    let avatarToDelete = req.body.avatarActuel.split('/profiles/')[1];

    console.log(avatarToDelete);

    if(avatarToDelete != "defaultUser.png") { // Pas de suppression de fichier si l'utilisateur a encore l'avatar de base
        fs.unlink(`images/profiles/${avatarToDelete}`, () => { 
        })
    }
    
    bdd.query('UPDATE users SET avatar="'+avatarToUpload+'" WHERE id="'+req.body.userId+'"', (err, result) => {
        if(err) throw err;
        return res.status(201).json({ message: 'Avatar changé '})
    })
}

exports.changePassword = (req, res, next) => {
    let syntaxPassword = /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{2,100}$/;

        if(syntaxPassword.test(req.body.currentPassword) && syntaxPassword.test(req.body.newPassword)) {
            bdd.query('SELECT password FROM users WHERE id="'+req.body.userId+'"', (err, resultat) => {
                if(err) throw err; 
                bcrypt.compare(req.body.currentPassword, resultat[0].password)
                .then(valid => {
                    if(!valid){
                        if(!valid) return res.status(500).json({ message: "L'utilisateur et le mot de passe ne correspondent pas"});
                    }
                    bcrypt.hash(req.body.newPassword, 10)
                        .then(hash => {
                            bdd.query('UPDATE users SET password="'+hash+'" WHERE id="'+req.body.userId+'"', (err, result) => {
                                if(err) throw err;
                                return res.status(200).json({ message: 'Le mot de passe a bien été changé '});
                            })
                        })
                        .catch(error => console.log(error));
                })
            })
        } else {
            return res.status(500).json({ message: 'Erreur dans les données transmises'});
        }
}

exports.deleteAccount = (req,res,next) => {
    let syntaxPassword = /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{2,100}$/;

    if(syntaxPassword.test(req.body.password)) {
        bdd.query('SELECT password, avatar FROM users WHERE id="'+req.body.userId+'"', (err, resultat) => {
            if(err) throw err; 
            bcrypt.compare(req.body.password, resultat[0].password)
            .then(valid => {
                if(!valid){
                    if(!valid) return res.status(500).json({ message: "L'utilisateur et le mot de passe ne correspondent pas"});
                }
                let avatarToDelete = resultat[0].avatar.split('/profiles/')[1]
                fs.unlink(`images/profiles/${avatarToDelete}`, () => { 
                    bdd.query('DELETE FROM users WHERE id="'+req.body.userId+'"',(err, result) => {
                        if(err) throw err;
                        bdd.query('DELETE FROM posts WHERE authorId="'+req.body.userId+'"',(err, result) => { 
                            if(err) throw err;
                            bdd.query('DELETE FROM comments WHERE idAuteur="'+req.body.userId+'"',(err, result) => { 
                                if(err) throw err;
                                return res.status(200).json({ message: 'Votre compte a bien été supprimé, vous allez être redirigé'});
                            })
                        })
                    })
                })

            })
        })
    } else {
        return res.status(500).json({ message: 'Erreur dans les données transmises '});
    }
}