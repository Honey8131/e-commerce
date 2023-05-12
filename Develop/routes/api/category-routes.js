const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(categories => res.json(categories))
  .catch(err => {
    if(err) throw err;
  })

});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(categoryById => !categoryById
    ? res.status(402).json({message: 'No category found with this id'})
    : res.json(categoryById)
    )
    .catch(err => {
      if(err) throw err;
    })
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  then(newCategory => res.json(newCategory))
  .catch(err => {
    if(err) throw err;
  })
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(updatedCategory => !updatedCategory[0]
    ?res.status(402).json({message: 'No category found with this id'})
    : res.json(updatedCategory)
    )
    .catch(err => {
      if(err) throw;
    })
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(deleteCategory => deleteCategory ? res.json(deleteCategory)
  : res.status(402).json({ message: 'No category found with this id'}))
  .catch(err => {
    if(err) throw err;
  })

});

module.exports = router;
