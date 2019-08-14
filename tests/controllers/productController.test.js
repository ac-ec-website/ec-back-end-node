const request = require('supertest')
const { expect } = require('chai')

const app = require('../../app')
const db = require('../../models')

describe('#Product Controller', () => {
  describe('GET /api/products', () => {
    before(async function() {
      // 在所有測試開始前會執行的程式碼區塊
      await db.Product.destroy({ where: {}, truncate: true })

      await db.Product.create({ name: 'product1' })
      await db.Product.create({ name: 'product2' })
    })

    it('取得所有產品', done => {
      request(app)
        .get('/api/products')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.products.length).to.be.equal(2)
          expect(res.body.products[0].name).to.be.equal('product1')
          expect(res.body.products[1].name).to.be.equal('product2')

          done()
        })
    })

    after(async function() {
      // 在所有測試結束後會執行的程式碼區塊
      await db.Product.destroy({ where: {}, truncate: true })
    })
  })

  // describe('POST /api/products', () => {
  //   before(async function () {
  //     // 在所有測試開始前會執行的程式碼區塊
  //     await db.Product.destroy({ where: {}, truncate: true })
  //   })

  //   it('未輸入產品名，返回錯誤提示', done => {
  //     request(app)
  //       .post('/api/product')
  //       .send('')
  //       .set('Accept', 'application/json')
  //       .expect(200)
  //       .end(function (err, res) {
  //         if (err) return done(err)
  //         expect(res.body.status).to.be.equal('error')
  //         expect(res.body.message).to.be.equal('請輸入名字及價格')

  //         done()
  //       })
  //   })
  //   it('未輸入價格，返回錯誤提示', done => {
  //     request(app)
  //       .post('/api/product')
  //       .send('')
  //       .set('Accept', 'application/json')
  //       .expect(200)
  //       .end(function (err, res) {
  //         if (err) return done(err)
  //         expect(res.body.status).to.be.equal('error')
  //         expect(res.body.message).to.be.equal('請輸入名字及價格')

  //         done()
  //       })
  //   })
  //   it('新增成功後，返回成功狀態及新增物件', done => {
  //     request(app)
  //       .post('/api/product')
  //       .send('name=product1&price=300')
  //       .set('Accept', 'application/json')
  //       .expect(200)
  //       .end(function (err, res) {
  //         if (err) return done(err)
  //         expect(res.body.status).to.be.equal('success')
  //         expect(res.body.product.name).to.be.equal('product1')

  //         done()
  //       })
  //   })

  //   after(async function () {
  //     // 在所有測試結束後會執行的程式碼區塊
  //     await db.Product.destroy({ where: {}, truncate: true })
  //   })
  // })
})
