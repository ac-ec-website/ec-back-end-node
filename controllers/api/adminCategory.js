const db = require('../../models')
const { Category } = db
const adCatService = require('../../services/adCatService')

const adminCategory = {
  getCategories: async (req, res) => {
    try {
      const categories = await adCatService.getCategories()

      return res.json({ categories })
    } catch (error) {
      return res.status(422).json(error)
    }
  },

  getCategory: async (req, res) => {
    try {
      const categoryId = req.params.id
      const category = await adCatService.getCategory(categoryId)

      return res.json({ category })
    } catch (error) {
      return res.status(422).json(error)
    }
  },

  postCategory: async (req, res) => {
    try {
      if (!req.body.name) {
        return res.json({ status: 'error', message: "name didn't exist" })
      }

      const name = req.body.name
      const category = await adCatService.postCategory(name)

      return res.json({ category, status: 'success', message: 'category was successfully created' })
    } catch (error) {
      return res.status(422).json(error)
    }
  },

  putCategory: async (req, res) => {
    try {
      if (!req.body.name) {
        return res.json({ status: 'error', message: "name didn't exist" })
      }

      const categoryId = req.params.id
      const data = { ...req.body }
      const category = await adCatService.putCategory(categoryId, data)

      return res.json({ category, status: 'success', message: 'category was successfully created' })
    } catch (error) {
      return res.status(422).json(error)
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const categoryId = req.params.id
      await adCatService.deleteCategory(categoryId)

      return res.json({ status: 'success', message: '' })
    } catch (error) {
      return res.status(422).json(error)
    }
  }
}

module.exports = adminCategory
