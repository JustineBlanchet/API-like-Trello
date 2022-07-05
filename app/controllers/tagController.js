const { Tag } = require('../models');

const tagController = {
  // lire toutes les tags
  list: async (req, res) => {
    try {
      // récupèrer les tags
      const tags = await Tag.findAll();
      // envoyer une réponse
      res.json(tags);
    } catch (error) {
      console.trace(error);
      res.status(500).json({
        message: 'Erreur'
      });
    }
  },
  // créer un tag
  create: async (req, res) => {
    try {
      const { title, color } = req.body;
      // gérer les champs obligatoires
      if (!title) {
        throw new Error('title required');
      }
      // créer le tag
      const newTag = await Tag.create({
        title,
        color,
      });
      // envoyer une réponse
      res.json(newTag);
    } catch (error) {
      console.trace(error);
      res.status(500).json({
        message: 'Erreur'
      });
    }
  },
  // lire un tag
  read: async (req, res) => {
    try {
      // récupérer l'id demandé
      const id = req.params.id;
      // trouver le tag
      const tag = await Tag.findByPk(id);
      if(!tag) {
        res.status(404).json(`No tag with id: ${id}`);
      }
      // On renvoit le tag
      res.json(tag);
    } catch (error) {
      console.trace(error);
      res.status(500).json({
        message: 'Erreur'
      });
    }
  },
  // mettre à jour un tag
  update: async (req, res) => {
    try {
      // récupérer l'id demandé
      const id = req.params.id;
      const { title, color } = req.body;
      // trouver le tag
      const tag = await Tag.findByPk(id);
      if(!tag) {
        res.status(404).json(`No tag with id: ${id}`);
      }
      // mettre à jour le tag avec les infos passées
      // si on nous a renseigné un champ, on le modifie
      if (title) {
        tag.title = title;
      }
      if (color) {
        tag.color = color;
      }
      // sauvegarder en bdd
      const tagSaved = await tag.save();
      // envoyer une réponse
      res.json(tagSaved);
    } catch (error) {
      console.trace(error);
      res.status(500).json({
        message: 'Erreur'
      });
    }
  },
  // supprimer un tag
  delete: async (req, res) => {
    try {
      // récupérer l'id demandé
      const id = req.params.id;
      // trouver le tag
      const tag = await Tag.findByPk(id);
      if(!tag) {
        res.status(404).json(`No tag with id: ${id}`);
      }
      // on supprime
      await tag.destroy();
      res.json('tag deleted');
    } catch (error) {
      console.trace(error);
      res.status(500).json({
        message: 'Erreur'
      });
    }
  },
  createOrUpdate: async (req, res) => {
    try {
      // on essaye de récupérer le tag en fonction de l'id éventuel
      let tag;
      if (req.params.id) {
        tag = await Tag.findByPk(req.params.id);
      }
      // si on connait ce tag
      if (tag) {
        // on met à jour
        await tagController.update(req, res);
      } else {
        // sinon on crée
        await tagController.create(req, res);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },
};

module.exports = tagController;