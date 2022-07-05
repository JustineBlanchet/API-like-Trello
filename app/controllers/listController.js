const { List, Card } = require('../models');

const listController = {
  readAll: async function (req, res) {
    try {
      // Récupération de toutes les listes avec leurs cartes et les tags associés aux cartes
      const lists = await List.findAll({
        include: {
          association: 'cards',
          include: 'tags',
        },
        order: [
          ['position', 'ASC'],
          ['name', 'ASC'],
          ['cards','position', 'ASC'],
        ],
      });
      res.json(lists);
    } catch (error) {
      console.log(error);
      // reponse sans détail structuel pour le consommateur de ma bdd
      res.status(500).json({
        message: 'Erreur lors de la récupération des listes',
      });
    }
  },
  create: async function (req, res) {
    try {
      const { name, position } = req.body;

      // gestion des champs obligatoires
      if (!name) {
        res.status(400).json({
          message: 'name required',
        });
      } 
      // create revient au même que build + save
      const newList = await List.create({
        name,
        position,
      });
      res.json(newList);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Erreur lors de la création de la liste',
      });
    }
  },
  readOne: async function (req, res) {
    try {
      const id = req.params.id;
      // je trouve la liste en fonction de l'id
      const list = await List.findByPk(id);
      if(!list) {
        return res.status(404).json(`No list with id: ${id}`)
      }
      res.json(list);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Erreur lors de la récupération de la liste',
      });
    }
  },
  update: async function (req, res) {
    try {
      const id = req.params.id;
      const { name, position } = req.body;
      if (!id) {
        res.status(400).json({
          message: 'id required',
        });
      } 
      const list = await List.findByPk(id);
      if(!list) {
        return res.status(404).json(`No list with id: ${id}`)
      }
      // Modifications des champs s'ils ont été renseignés
      if (name) {
        list.name = name;
      }
      if (position) {
        list.position = Number(position);
      }
      // Sauvegarde de la liste modifiée
      const listSaved = await list.save();
      res.json(listSaved);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Erreur lors de la mise à jour de la liste',
      });
    }
  },
  delete: async function (req, res) {
    try {
      const id = req.params.id;
      const list = await List.findByPk(id);
      if(!list) {
        return res.status(404).json(`No list with id: ${id}`)
      }
      await list.destroy();
      res.json('List deleted');
    } catch (error) {
      console.trace(error);
      res.status(500).json({
        message: 'Erreur'
      });
    }
  }, 
  // les cartes d'une liste
  readCards: async (req, res) => {
    try {
      // on récupère l'id de la liste
      const id = req.params.id;
      // on récupère les cartes remplissant une condition
      const cards = await Card.findAll({
        where: {
          list_id: id,
        },
        include: 'tags'
      });
      // on renvoie les cartes
      res.json(cards);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },
  createOrUpdate: async (req, res) => {
    try {
      // on essaye de récupérer la liste en fonction de l'id éventuel
      let list;
      if (req.params.id) {
        list = await List.findByPk(req.params.id);
      }
      // si on connait cette liste
      if (list) {
        // on met à jour
        await listController.update(req, res);
      } else {
        // sinon on crée
        await listController.create(req, res);
      }
    } catch (error) {
      console.trace(error);
      res.status(500).send(error);
    }
  },
};

module.exports = listController;