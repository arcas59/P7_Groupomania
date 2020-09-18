// Plugin Npm Node.js
const multer = require('multer');
const path = require('path');

// Ajout des formats d'images
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Constante qui permets d'enregistrer l'image
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const extPath = path.extname(`/images/${file.originalname}`);
    const name = file.originalname.split(' ').join('_').split(extPath).join('');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + '_' + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');