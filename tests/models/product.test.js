const chai = require('chai')
chai.use(require('sinon-chai'))
const { expect } = require('chai')
const db = require('../../models')
const ProductModel = require('../../models/product')

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers')

describe('# Product Model', () => {
  const Product = ProductModel(sequelize, dataTypes)
  const product = new Product()

  checkModelName(Product)('Product')

  context('Properties', () => {
    ;[
      'name',
      'image',
      'description',
      'stock_quantity',
      'cost_price',
      'origin_price',
      'sell_price',
      'product_status'
    ].forEach(checkPropertyExists(product))
  })

  context('Associations', () => {
    const Cart = 'Cart'
    const Order = 'Order'

    before(() => {
      Product.associate({ Cart })
      Product.associate({ Order })
    })

    it('defined a belongsToMany association with cart', () => {
      expect(Product.belongsToMany).to.have.been.calledWith(Cart)
    })
    it('defined a belongsToMany association with order', () => {
      expect(Product.belongsToMany).to.have.been.calledWith(Order)
    })
  })

  describe('CRUD', () => {
    let data = null

    it('create', done => {
      db.Product.create({}).then(product => {
        data = product
        done()
      })
    })
    it('read', done => {
      db.Product.findByPk(data.id).then(product => {
        expect(data.id).to.be.equal(product.id)
        done()
      })
    })
    it('update', done => {
      db.Product.update({}, { where: { id: data.id } }).then(() => {
        db.Product.findByPk(data.id).then(product => {
          expect(data.updatedAt).to.be.not.equal(product.updatedAt)
          done()
        })
      })
    })
    it('delete', done => {
      db.Product.destroy({ where: { id: data.id } }).then(() => {
        db.Product.findByPk(data.id).then(product => {
          expect(product).to.be.equal(null)
          done()
        })
      })
    })
  })
})
