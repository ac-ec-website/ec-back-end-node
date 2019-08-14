const db = require('./../../models')
const Cart = db.Cart
const CartItem = db.CartItem
const Product = db.Product

const cartController = {
  // 取得單一購物車的資料
  getCart: async (req, res) => {
    const cart = await Cart.findOne({
      where: { id: req.params.id },
      include: [{ model: Product, as: 'items' }]
    })

    return res.json({
      cart
    })
  }
}

module.exports = cartController
