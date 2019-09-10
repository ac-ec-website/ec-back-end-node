const db = require('../models')
const { Category } = db

const adCatService = {
  getCategories: async () => {
    const categories = await Category.findAll()

    return categories
  },

  getCategory: async categoryId => {
    const category = await Category.findByPk(categoryId)

    return category
  },

  postCategory: async name => {
    const category = await Category.create({ name: name })

    return category
  },

  putCategory: async (categoryId, data) => {
    const category = await Category.findByPk(categoryId)
    await category.update(data)

    return category
  },

  deleteCategory: async categoryId => {
    const category = await Category.findByPk(categoryId)
    await category.destroy()
  }
}

module.exports = adCatService
