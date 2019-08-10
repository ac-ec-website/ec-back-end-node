const db = require('./../../models');
const Product = db.Product;

const productController = {
  // 取得所有商品的資料
  getProducts: async (req, res) => {
    const products = await Product.findAll();

    return res.json({
      products
    })
  },
}

module.exports = productController;