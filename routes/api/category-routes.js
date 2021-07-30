const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoriesData = await Category.findAll();
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoriesSearch = await Category.findOne({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(categoriesSearch);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update({
      category_name: req.body.category_name
    },{
      where: {
        id: req.params.id
      }
    })
    if(updateCategory[0] > 0){
      const category = await Category.findOne({
        where: {
          id: req.params.id
        }
      })
      res.status(200).json(category);
    } res.json({message: 'Nothing changed'})

  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    Category.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json({message: 'Item Deleted'});
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
