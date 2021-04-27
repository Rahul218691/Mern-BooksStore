const router = require('express').Router();
const {protect,admin} = require('../middlewares/authMiddleware');
const {
	getbooks,
	getSingleBook,
	uploadBook,
	updateBook,
	deleteBook
} = require('../controllers/bookController');


const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/books/")
    },
    filename: function (req, file, cb) {
        const parts = file.mimetype.split("/");
        cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
    }
})

const upload = multer({storage});

router.get('/allbooks',getbooks);
router.get('/single/:slug',getSingleBook);
router.post('/addbook',protect,admin,upload.single('evobook'),uploadBook);
router.put('/editbook',protect,admin,updateBook);
router.delete('/removebook/:id',protect,admin,deleteBook);

module.exports = router;