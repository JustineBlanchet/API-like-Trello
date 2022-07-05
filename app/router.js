const express = require('express');
const listController = require('./controllers/listController');
const cardController = require('./controllers/cardController');
const tagController = require('./controllers/tagController');
const mainController = require('./controllers/mainController');

const router = express.Router();

router.get('/lists', listController.readAll);
router.post('/lists', listController.create);
router.get('/lists/:id', listController.readOne);
router.patch('/lists/:id', listController.update);
router.delete('/lists/:id', listController.delete);
router.put('/lists/:id?', listController.createOrUpdate);


// Card
router.get('/cards', cardController.list);
router.post('/cards', cardController.create);
router.get('/cards/:id', cardController.read);
router.patch('/cards/:id', cardController.update);
router.delete('/cards/:id', cardController.delete);
router.put('/cards/:id?', cardController.createOrUpdate);

// tag
router.get('/tags', tagController.list);
router.post('/tags', tagController.create);
router.get('/tags/:id', tagController.read);
router.patch('/tags/:id', tagController.update);
router.delete('/tags/:id', tagController.delete);
router.put('/tags/:id?', tagController.createOrUpdate);

// Routes complémentaires
router.post('/cards/:card_id/tag/:tag_id', cardController.addTagToCard);
router.delete('/cards/:card_id/tag/:tag_id', cardController.removeTagFromCard);
router.get('/lists/:id/cards', listController.readCards);

router.use(mainController.notFound);

module.exports = router;
