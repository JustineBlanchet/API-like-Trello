const { Card, Tag } = require('../models');

const cardController = {
  // lire toutes les cartes
  list: async (req, res) => {
    try {
      // récupèrer les cartes avec leurs tags associés
      const cards = await Card.findAll({
        include: 'tags',
        order: [
          ['position', 'ASC'],
        ],
      });
      // envoyer toutes les cartes en json
      res.json(cards);
    } catch (error) {
      console.trace(error);
      res.status(500).json({
        message: 'Erreur'
      });
    }
  },
  // créer une carte
  create: async (req, res) => {
    try {
      const { title, color, description, position, list_id } = req.body;
      // gérer les champs obligatoires
      if (!title) {
        throw new Error('title required');
      }
      if (!list_id) {
        throw new Error('list_id required');
      }
      // créer la carte
      const newCard = await Card.create({
        title,
        color,
        description,
        position,
        list_id,
      });
      // envoyer la nouvelle carte créée
      res.json(newCard);
    } catch (error) {
      console.trace(error);
      res.status(500).json({
        message: 'Erreur'
      });
    }
  },
  // lire une carte
  read: async (req, res) => {
    try {
      // récupérer l'id demandé
      const id = req.params.id;
      // trouver la carte en lui incluant ses tags associés
      const card = await Card.findByPk(id, {
        include: 'tags',
        order: [
          ['position', 'ASC']
        ],
      });
      // Si aucune carte n'est retournée, on renvoi un status 404
      if(!card) {
        return res.status(404).json(`No card with id: ${id}`);
      }
      res.json(card);
    } catch (error) {
      console.trace(error);
      res.status(500).json({
        message: 'Erreur'
      });
    }
  },
  // mettre à jour une carte
  update: async (req, res) => {
    try {
      // récupérer l'id demandé
      const id = req.params.id;
      const { title, color, description, position, list_id } = req.body;
      // trouver la carte
      const card = await Card.findByPk(id);
      // Gestion de l'erreur
      if(!card) {
        return res.status(404).json(`No card with id: ${id}`);
      }
      // si tout va bien on modifie
      // modification des champs s'ils ont été renseignés
      if (title) {
        card.title = title;
      }
      if (color) {
        card.color = color;
      }
      if (description) {
        card.description = description;
      }
      if (position) {
        card.position = position;
      }
      if (list_id) {
        card.list_id = list_id;
      }
      // sauvegarder en bdd
      const cardSaved = await card.save();
      // renvoyer la carte modifiée
      res.json(cardSaved);
    } catch (error) {
      console.trace(error);
      res.status(500).json({
        message: 'Erreur'
      });
    }
  },
  // supprimer une carte
  delete: async (req, res) => {
    try {
      // récupérer l'id demandé
      const id = req.params.id;
      // trouver la carte
      const card = await Card.findByPk(id);
      if(!card) {
        return res.status(404).json(`No card with id: ${id}`);
      }
      // suppression de la carte
      await card.destroy();
      res.json('Card deleted');
    } catch (error) {
      console.trace(error);
      res.status(500).json({
        message: 'Erreur'
      });
    }
  },
  // association de tag
  addTagToCard: async (req, res) => {
    try {
      // récupération des id
      const cardId = req.params.card_id;
      const tagId = req.params.tag_id;
      // on récupère la carte
      const card = await Card.findByPk(cardId, {
        include: 'tags'
      });
      if (!card) {
        return res.status(404).json(`No card with id: ${cardId}`);
      }
      // on récupère le tag
      const tag = await Tag.findByPk(tagId);
      if (!tag) {
        return res.status(404).json(`No tag with id: ${tagId}`);
      }
      // on ajoute le tag à la carte 
      await card.addTag(tag);
      // rechargement de la carte pour pouvoir accéder à la carte modifiée
      await card.reload();
      // on envoit la réponse
      res.json(card);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },
  // dissociation de tag
  removeTagFromCard: async (req, res) => {
    try {
      // récupération des id
      const cardId = req.params.card_id;
      const tagId = req.params.tag_id;
      // on récupère la carte
      const card = await Card.findByPk(cardId, {
        include: 'tags'
      });
      if (!card) {
        return res.status(404).json(`No card with id: ${cardId}`);
      }
      // on récupère le tag
      const tag = await Tag.findByPk(tagId);
      if (!tag) {
        return res.status(404).json(`No tag with id: ${tagId}`);
      }
      // on retire le tag de la carte
      await card.removeTag(tag);
      // rechargement de la carte
      await card.reload();
      // on envoit la réponse
      res.json(card);
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },
  createOrUpdate: async (req, res) => {
    try {
      // on essaye de récupérer la carte en fonction de l'id éventuel
      const id = req.params.id;
      let card;
      if (id) {
        card = await Card.findByPk(id);
      }
      // si on connait cette carte
      if (card) {
        // on met à jour
        await cardController.update(req, res);
      } else {
        // sinon on crée
        await cardController.create(req, res);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },
};

module.exports = cardController;