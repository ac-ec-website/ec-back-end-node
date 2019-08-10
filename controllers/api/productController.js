const productController = {
  // 取得所有商品的資料
  getProducts: (req, res) => {
    return res.json({
      data: {
        status: 'success'
      }
    })
  },
}

module.exports = productController;