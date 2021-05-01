const router = require('express').Router();
const {protect,admin} = require('../middlewares/authMiddleware');
const {
	getbooks,
	getSingleBook,
	uploadBook,
	updateBook,
	deleteBook,
    bookPublish,
    uploadbookPDF,
    editorBooks,
    newBooks,
    classicBooks,
    downloadBook
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


const storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/books/files/")
    },
    filename: function (req, file, cb) {
        const parts = file.mimetype.split("/");
        cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
    }
})

const upload1 = multer({storage:storage1});

router.get('/allbooks',getbooks);
router.get('/single/:slug',getSingleBook);
router.get('/editorchoice',editorBooks);
router.get('/newarrivals',newBooks);
router.get('/classicbooks',classicBooks);
router.get('/download/:bookid',downloadBook);

router.post('/addbook',protect,admin,upload.single('evobook'),uploadBook);
router.post('/uploadfile',protect,admin,upload1.single('bookpdf'),uploadbookPDF);


router.put('/editbook',protect,admin,updateBook);
router.patch('/publish',protect,admin,bookPublish);

router.delete('/removebook/:id',protect,admin,deleteBook);

module.exports = router;