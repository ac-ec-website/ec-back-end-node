var chai = require('chai')
var sinon = require('sinon')
chai.use(require('sinon-chai'))
const request = require('supertest')
const { expect } = require('chai')

const app = require('../../app')
const db = require('../../models')
const CategoryModel = require('../../models/category')

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkUniqueIndex,
  checkPropertyExists
} = require('sequelize-test-helpers')

describe('# Category Model', () => {
  const Category = CategoryModel(sequelize, dataTypes)
  const category = new Category()

  checkModelName(Category)('Category')

  context('Properties', () => {
    ;['name'].forEach(checkPropertyExists(category))
  })

  context('Associations', () => {
    const Product = 'Product'

    before(() => {
      Category.associate({ Product })
    })

    it('defined a hasMany association with cart', () => {
      expect(Category.hasMany).to.have.been.calledWith(Product)
    })
  })

  describe('CRUD', () => {
    let data = null

    it('create', done => {
      db.Category.create({}).then(category => {
        data = category
        done()
      })
    })
    it('read', done => {
      db.Category.findByPk(data.id).then(category => {
        expect(data.id).to.be.equal(category.id)
        done()
      })
    })
    it('update', done => {
      db.Category.update({}, { where: { id: data.id } }).then(() => {
        db.Category.findByPk(data.id).then(category => {
          expect(data.updatedAt).to.be.not.equal(category.updatedAt)
          done()
        })
      })
    })
    it('delete', done => {
      db.Category.destroy({ where: { id: data.id } }).then(() => {
        db.Category.findByPk(data.id).then(category => {
          expect(category).to.be.equal(null)
          done()
        })
      })
    })
  })
})
