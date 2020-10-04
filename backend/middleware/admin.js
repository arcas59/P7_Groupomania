const bdd = require('../mysqlConfig');

module.exports = (req, res, next) => {
    bdd.query('SELECT role FROM users WHERE id="'+req.body.userId+'"', (err, resultat) => {
        if(err) throw err;
        if(resultat[0].role == "admin") {
            next();
        }
        else {
            return res.status(403).json({ message: 'Accès non autorisé '});
        }
    })
}