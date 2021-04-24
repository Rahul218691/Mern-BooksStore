const router = require('express').Router();
const {protect,admin} = require('../middlewares/authMiddleware');
const {
getAuthors,
getSingleAuthor,
addAuthor
} = require('../controllers/authorController');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/author/")
    },
    filename: function (req, file, cb) {
        const parts = file.mimetype.split("/");
        cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
    }
})

const upload = multer({storage});

router.get('/selectedauthor',getSingleAuthor);
router.get('/allauthors',protect,admin,getAuthors);
router.post('/addauthor',protect,admin,upload.single('author'),addAuthor);

module.exports = router;