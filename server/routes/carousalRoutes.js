const router = require('express').Router();
const {addCarousal,getCarousals,updateCarousal,deleteCarousal} = require('../controllers/carousalController');
const {protect,admin} = require('../middlewares/authMiddleware');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/carousal/")
    },
    filename: function (req, file, cb) {
        const parts = file.mimetype.split("/");
        cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
    }
})

const upload = multer({storage});

router.get('/getcarousal',getCarousals);

router.post('/addcarousal',protect,admin,upload.single('carousal'),addCarousal);

router.put('/editcarousal',protect,admin,upload.single('carousal'),updateCarousal);

router.delete('/carousal/:id',protect,admin,deleteCarousal);

module.exports = router;