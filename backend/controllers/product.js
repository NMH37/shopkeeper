const Product = require('./../models/product');

exports.fetchProducts = (req, res) => {
  Product.find().sort({ "name": -1 })
    .then((documents) => {
      res.status(200).json({
        Products: documents,
        message: 'Products Fetched from DB'
      });
    })
    .catch(() => {
      res.status(500).json({ message: 'Fetching Product lists failed !' })
    });
}
exports.createProduct = (req, res) => {
  console.log(req.body)
  product = new Product({
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,

  });
  product.save().then((product) => {
    res.status(201).json(product);
  })
    .catch(error => {
      const errors = Object.keys(error.errors).map(key => error.errors[key].message)
      res.status(500).json({ message: 'Creating a new Product failed', errors })
    });
}

exports.getOneProduct = (req, res) => {
  Product.findOne({ _id: req.params.id })
    .then((product) => {
      if (product) {
        res.status(200).json(product);

      } else {
        res.status(401).json({ message: 'Product not found' })
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Fetching Product failed !' })
    });
}

exports.updateProduct = (req, res) => {
  Product.updateOne({ _id: req.params.id }, req.body, { new: true }).then((result) => {

    if (result.nModified > 0) {
      res.status(200).json({ message: ' updated one' });
    }


  })
    .catch((error) => {
      const errors = Object.keys(error.errors).map(key => error.errors[key].message)

      res.status(500).json({ message: "Product can't be updated", errors })
    })
}
exports.removeProduct = (req, res) => {
  Product.deleteOne({ _id: req.params.id, quantity: 0 })
    .then((response) => {
      // console.log(response, 'checking delete method')
      if (response.n > 0) {
        res.status(200).json({ message: 'Product Deleted' });
      } else {
        res.status(401).json({ message: 'Not available anymore' })
      }

    })
    .catch(() => {
      res.status(500).json({ message: 'Deleting is not an available option for this Product !' });
    });



}
