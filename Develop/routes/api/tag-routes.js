const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{model: Product, attributes: ["id", "product_name", "price", "stock", "category_id"], through: ProductTag, as: "products"},]
  }).then(tags => res.json(tags))
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    include: [{model: Product, attributes: ["id", "product_name", "price", "stock", "category_id"], through: ProductTag, as: "products"},]
  }).then(tags => res.json(tags))
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)({
  }).then(tags => res.json(tags)) 
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updated => res.json(updated))
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(destroyed => res.json(destroyed))
});

module.exports = router;
