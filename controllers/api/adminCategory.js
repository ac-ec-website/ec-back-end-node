const db = require('../../models')
const { Category } = db

const adminCategory = {
  getCategories: async (req, res) => {
    const categories = await Category.findAll()

    return res.json({ categories })
  },

  getCategory: async (req, res) => {
    const category = await Category.findByPk(req.params.id)

    return res.json({ category })
  },

  postCategory: async (req, res) => {
    if (!req.body.name) {
      return res.json({ status: 'error', message: "name didn't exist" })
    }

    const categoryData = await Category.create({ name: req.body.name })
    const category = await Category.findByPk(categoryData.id)

    return res.json({ category, status: 'success', message: 'category was successfully created' })
  },

  putCategory: async (req, res) => {
    if (!req.body.name) {
      return res.json({ status: 'error', message: "name didn't exist" })
    }

    const category = await Category.findByPk(req.params.id)
    await category.update(req.body)

    return res.json({ category, status: 'success', message: 'category was successfully created' })
  },

  deleteCategory: async (req, res) => {
    const category = await Category.findByPk(req.params.id)
    await category.destroy()

    return res.json({ status: 'success', message: '' })
  }
}

module.exports = adminCategory
