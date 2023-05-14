const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [{ model: Product}]
  }).then((categoryData) =>
    res.json(categoryData));
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: [{ model: Product}]
  }).then((categoryData) => {
    if(!categoryData) {
      res.status(404).json({message: 'No category found with this id!'});
      return;
    }
    res.json(categoryData);
  });
});

  // create a new category
router.post('/', (req, res) => {
  Category.create(req.body)
    .then((categoryData) => {
      res.json(categoryData);
    })
    .catch((err) => {
      res.json(err);
    });
});
 // update a category by its `id` value
router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => {
      res.json(err);
    })
});

  // delete a category by its `id` value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => {
      res.json(err);
    })
});

module.exports = router;


