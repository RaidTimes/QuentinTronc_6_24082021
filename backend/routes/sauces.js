const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const saucesCtrl = require('../controllers/sauces');

router.get('/', auth, saucesCtrl.getAllThings);
router.post('/', auth, multer, saucesCtrl.createThing);
router.get('/:id', auth, saucesCtrl.getOneThing);
router.put('/:id', auth, multer, saucesCtrl.modifyingThing);
router.post('/:id/like', auth, multer, saucesCtrl.modifyLike);
router.delete('/:id', auth, multer, saucesCtrl.deleteThing);


module.exports = router;