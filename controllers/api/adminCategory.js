const db = require('../../models')
const { Category } = db
const adCatService = require('../../services/adCatService')

const adminCategory = {
  getCategories: async (req, res) => {
    try {
      const { categories } = await adCatService.getCategories()

      return res.json({ categories })
    } catch (error) {
      console.log('取得後台分類 error', error)
      return res.sendStatus(500)
    }
  },

  getCategory: async (req, res) => {
    try {
      const categoryId = req.params.id
      const { category } = await adCatService.getCategory(categoryId)

      return res.json({ category })
    } catch (error) {
      console.log('單一後台分類 error', error)
      return res.sendStatus(500)
    }
  },

  postCategory: async (req, res) => {
    try {
      if (!req.body.name) {
        return res.json({ status: 'error', message: "name didn't exist" })
      }

      const name = req.body.name
      const { category } = await adCatService.postCategory(name)

      return res.json({ category, status: 'success', message: 'category was successfully created' })
    } catch (error) {
      console.log('新增後台分類 error', error)
      return res.sendStatus(500)
    }
  },

  putCategory: async (req, res) => {
    try {
      if (!req.body.name) {
        return res.json({ status: 'error', message: "name didn't exist" })
      }

      const categoryId = req.params.id
      const data = { ...req.body }
      const { category } = await adCatService.putCategory(categoryId, data)

      return res.json({ category, status: 'success', message: 'category was successfully created' })
    } catch (error) {
      console.log('更新後台分類 error', error)
      return res.sendStatus(500)
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const categoryId = req.params.id
      await adCatService.deleteCategory(categoryId)

      return res.json({ status: 'success', message: '' })
    } catch (error) {
      console.log('刪除後台分類 error', error)
      return res.sendStatus(500)
    }
  }
}

module.exports = adminCategory
