const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags includes associated Product data
router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(findAllTags => res.json(findAllTags))
  .catch(err => res.status(400).json(err));
});

// find a single tag by its `id` includes associtated Product data
router.get('/:id', (req, res) => {
  Tag.findOne({
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
  .then(findTagById => findTagById ? res.json(findTagById) : res.status(402).json({ message: 'No tag by this id'}))
  .catch(err => res.status(400).json(err));
});

// create a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(createTag => res.json(createTag))
  .catch(err => {
    if (err) throw err;
  })
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(updateTagById => !updateTagById[0] ? res.status(402).json({ message: 'No tag by that id'}) : res.json(updateTagById))
})

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(deleteTagById => !deleteTagById ? res.status(402).json({ message: 'No tag by that id'}) : res.json(deleteTagById))
});

module.exports = router;