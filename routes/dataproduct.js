const express = require('express');
const router = express.Router();
const {createProduct,readProduct,updateProduct,deleteProduct,readProductid} = require('../controllers/CRUD_product');

router.post('/createProduct',createProduct);
router.get('/readProduct',readProduct);
router.put('/updateProduct',updateProduct);
router.delete('/deleteProduct/:id',deleteProduct);
router.get('/readProduct/:id',readProductid);

module.exports = router