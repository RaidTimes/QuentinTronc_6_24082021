const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const saucesCtrl = require('../controllers/sauces');

router.get('/', auth, saucesCtrl.getAllThings);
router.post('/', auth, saucesCtrl.createThing);
router.get('/:id', auth, saucesCtrl.getOneThing);
router.put('/:id', auth, saucesCtrl.modifyingThing);
router.delete('/:id', auth, saucesCtrl.deleteThing);


module.exports = router;