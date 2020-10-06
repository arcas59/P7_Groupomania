const bdd = require('../mysqlConfig');

exports.getFlaggedPosts = (req, res, next) => {

    bdd.query('SELECT * FROM posts WHERE isFlagged="1" ORDER BY id DESC ', (err, resultat) => {
        if(err) throw (err);
        return res.status(200).json({ resultat });
    })
};

exports.flagPost = (req,res,next) => {

        bdd.query('SELECT role FROM users WHERE id="'+req.body.userId+'"', (err, result) => { // Vérification des accès de celui qui fait la requête
            if(err) {
                return res.status(500).json({message: 'Erreur lors du traitement de la requête'});
            }
            if(result[0].role == "admin" && req.body.roleUser == "admin") {
                if(req.body.isFlagged == 0) {
                bdd.query('UPDATE posts SET isFlagged="1" WHERE id="'+req.body.idToFlag+'"', (err, result) => {
                    if(err) {
                        return res.status(500).json({message: 'Erreur lors du traitement de la requête'});
                    }
                    return res.status(200).json({ message: 'Le poste a bien été mis en quarantaine'});
                })
                } else {
                    bdd.query('UPDATE posts SET isFlagged="0" WHERE id="'+req.body.idToFlag+'"', (err, result) => {
                        if(err) {
                            return res.status(500).json({message: 'Erreur lors du traitement de la requête'});
                        }
                        return res.status(200).json({ message: "Le poste a été remis dans le fil d'actualité"});
                    })
                }
            }
        })
};
