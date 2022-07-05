const mainController = {
  notFound: (req, res) => {
    res.status(404).json('This endpoint does not exist');
  },
};

module.exports = mainController;