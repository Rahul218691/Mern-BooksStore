const router = require('express').Router();
const {protect,admin} = require('../middlewares/authMiddleware');

const {
getGenres,
addGenre,
deleteGenre,
// paginatedGenres
} = require('../controllers/genreController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/genres/")
    },
    filename: function (req, file, cb) {
        const parts = file.mimetype.split("/");
        cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
    }
})

const upload = multer({storage});

router.get('/getgenres',getGenres);

// router.get('/paginated/genres',paginatedGenres);

router.post('/addgenre',protect,admin,upload.single('genres'),addGenre);

router.delete('/genreremove/:id',protect,admin,deleteGenre);


module.exports = router;