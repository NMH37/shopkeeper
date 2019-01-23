const express = require('express');
router = express.Router();
const productController = require('../controllers/product');

router.post('', productController.createProduct);

router.put('/:id', productController.updateProduct);

router.get('', productController.fetchProducts);

router.get('/:id', productController.getOneProduct);

router.delete('/:id', productController.removeProduct);

module.exports = router;
