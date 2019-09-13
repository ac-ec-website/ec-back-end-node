const db = require('../models')
const Category = db.Category

const categoryService = {
  getAllCategories: async (req, res) => {
    const categories = await Category.findAll()
    return categories
  }
}

module.exports = categoryService
