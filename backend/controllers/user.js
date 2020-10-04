const bdd = require('../mysqlConfig');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    let user = req.body; 

    //Vérification de la bonne syntaxe des données reçues via regex + array de vérification
    let emailSyntaxe = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
    let autresChampsSyntaxe = /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{2,}$/;
    let verification = [
        emailSyntaxe.test(user.email),
        autresChampsSyntaxe.test(user.nom),
        autresChampsSyntaxe.test(user.prenom),
        autresChampsSyntaxe.test(user.pseudo), 
    ]
    if(verification.every(Boolean)) {
        bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash; 
            bdd.query('SELECT * from users WHERE pseudo="'+user.pseudo+'" OR email="'+user.email+'"', (err, result) => { // Vérification si utilisateur ou email existe déjà
                if(err) throw err; 
                if(result.length >= 1) {
                    return res.status(500).json({ message: "L'utilisateur ou l'adresse email existe déjà"});
                }
                else { // Insertion des données si l'utilisateur ou l'adresse email existe déjà n'existe pas
                    bdd.query('INSERT INTO users SET ?', user,  (erreur, resultat) => {
                        if (erreur) throw erreur; 
                        return res.status(201).json({ message: 'Vous êtes bien enregistrés, vous allez être redirigé. '});
                    })
                }
            })
        })
    }
    else {
        return res.status(500).json({ message: 'Données transmises non correctes '});
    }
}

exports.login = (req, res, next) => {
    let champsSyntaxe = /^[a-z A-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ0-9-]{2,}$/;
    let user = req.body;
    let verification = [
        champsSyntaxe.test(user.pseudo),
        champsSyntaxe.test(user.password) 
    ]
    if(verification.every(Boolean)) {
        bdd.query('SELECT password, id FROM users WHERE pseudo="'+user.pseudo+'"', (err, result) => { // Si l'utilisateur existe bien, on recherche le password
            if(err) throw err; 
            if(result.length <= 0) {
                return res.status(500).json({ message: "L'utilisateur n'existe pas"});
            } else {
                console.log(user.password); 
                console.log(result[0]);
                bcrypt.compare(user.password, result[0].password)
                .then(valid => {
                    if(!valid) return res.status(500).json({ message: "L'utilisateur et le mot de passe ne correspondent pas"});
                        res.status(200).json({ 
                            message: 'Login effectué, vous allez être redirigé ',
                            token: jwt.sign(
                                { userId: result[0].id },
                                'RANDOM_TOKEN',
                                { expiresIn: 3600}
                            ), 
                            userId: result[0].id
                        });
                })
                .catch(() => {
                    return res.status(500).json({ message: "Un erreur s'est produite"});
                })
            }
        })
    }
    else {
        return res.status(500).json({ message: 'Données transmises non correctes '});
    }
}

exports.getInfos = (req, res, next) => {
    bdd.query('SELECT * FROM users WHERE id="'+req.params.id+'"', (err, resultat) => {
        if(err) throw err; 
        console.log(resultat);
        return res.status(200).json(resultat);
    })
}

exports.getAllPosts = (req, res, next) => {
    let IdParsed = parseInt(req.params.id, 10)
    console.log(IdParsed);

    bdd.query('SELECT * FROM posts WHERE authorId="'+IdParsed+'" ORDER BY id DESC', (err, resultat) => {
        if(err) throw err; 
        return res.status(200).json(resultat);
    })
}

exports.getAllUsers = (req, res, next) => {
    bdd.query('SELECT * FROM users', (err, resultat) => {
        if(err) throw err;
        return res.status(200).json(resultat);
    })
}