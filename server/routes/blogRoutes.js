const router = require('express').Router();
const {protect,admin} = require('../middlewares/authMiddleware');
const {
	fetchBlogs,
	fetchBlog,
	uploadBlog,
	deleteBlog,
    viewCount
} = require('../controllers/blogController');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/blogs/")
    },
    filename: function (req, file, cb) {
        const parts = file.mimetype.split("/");
        cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
    }
})

const upload = multer({storage});


router.get('/allblogs',fetchBlogs);
router.get('/:slug',fetchBlog);
router.get('/view/:slug',viewCount);
router.post('/addblog',protect,admin,upload.single('blog'),uploadBlog);
router.delete('/removeblog',protect,admin,deleteBlog);



module.exports = router;