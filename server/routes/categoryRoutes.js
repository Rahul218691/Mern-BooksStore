const router = require('express').Router();
const {categoryBooks} = require('../controllers/categoryController');

router.get('/:slug',categoryBooks);

module.exports = router;