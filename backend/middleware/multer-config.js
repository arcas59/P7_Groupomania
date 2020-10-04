const multer = require('multer');

// Création des mime types pour extension fichier
const MIME_TYPES = {
    'image/jpg': 'jpg', 
    'image/jpeg': 'jpg', 
    'image/png': 'png', 
    'image/gif': 'gif'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images/posts')
    }, 
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
})

module.exports = multer({ storage }).single('image'); 