const assert = require('assert')
const chai = require('chai')
const request = require('supertest')
const sinon = require('sinon')
const should = chai.should()
const { expect } = require('chai')
const stubForTest = require('../../config/stubForTest')
let app = require('../../app')
const db = require('../../models')

describe('#Payment Controller', () => {
  before(async () => {
    sinon.stub(stubForTest, 'stubSession').callsFake((req, res, next) => {
      req.session.orderId = 1
      req.session.paymentId = 1
      req.session.save()

      return next()
    })
  })

  describe('GET /payment', () => {
    before(async function() {
      await db.Payment.destroy({ where: {}, truncate: true })
      await db.Order.destroy({ where: {}, truncate: true })

      await db.Payment.create({ id: 1 })
      await db.Order.create({
        id: 1,
        checkoutPrice: 100,
        email: 'root@example.com'
      })
    })

    it('確認付款人電子信箱', done => {
      request(app)
        .get('/api/payment')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.order.email).to.be.equal('root@example.com')
          done()
        })
    })

    it('確認商店代號 MERCHANT_ID', done => {
      request(app)
        .get('/api/payment')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err)
          expect(res.body.tradeInfo.MerchantID).to.be.equal(process.env.MERCHANT_ID)
          done()
        })
    })

    after(async function() {
      await db.Payment.destroy({ where: {}, truncate: true })
      await db.Order.destroy({ where: {}, truncate: true })
    })
  })

  describe('POST /spgateway/callback 交易成功', () => {
    before(async function() {
      await db.Payment.destroy({ where: {}, truncate: true })
      await db.Order.destroy({ where: {}, truncate: true })

      await db.Payment.create({ sn: '1568598549355' })
      await db.Order.create({
        sn: '1568598549355',
        checkoutPrice: 520
      })
    })

    it('交易成功', done => {
      request(app)
        .post('/api/spgateway/callback')
        .send({
          TradeInfo:
            'dd7e9560254855fa15532ed4ee64496c530d7c39e08e357cc9fc7f1c7dca72f1616fddf3bbf65ef76af4195024bcb4b93c6ed52e7b32e3cd2f20bfbd3a45106da67c86fdf1877cb5a0aa0dc7de6b7123235ae7bfc7dcb6f308b241824f2eee9d46390a7417e6f269d7333dcc26f952a15e99ae14848e13e5aebbb724292ebe37061d514866d496a10fa24f23c664e93f66877977c75410850e643cda8987166fa11af5c2ebc86bdc29c6f56b2d8e881066dbab13f91d6bb99448b082c7f27a83a3aca60fa75428828281673a33c417813d65cdb33fe7132018d5c816c7e7dff1e91cbbd3a591c02885e0c2897de338b1d75a70060a04ce213f17a7d92b9b41d8e730f4621d1fed1d6449823866e049e89d8916d9348848b2bd5690153dfcd58b074c18702ef42f0c23cebdf122552bca2e61a81bdd861f75fa3bc1592331868366ce5b97d05c58b96898848bec77de46c5440f4d2dc9303cad9b7c4f719049bde8ce44360d1bf0a5b2ac72ac85026beca62ee94fe6659fc49e1a92d473260fba954b963c26ccbaf763b9cee02b6bd3e85ee95d8476f56f992ad9481c3c0060f28388836b8a9ef75715154b8c799d7484e37fe0a56c4ceb7f46356450bf57690a73aac024a7905732ce35c24ae6e97ba26af48127f8417e4b9387c7e1ed69d755'
        })
        .set('Accept', 'application/json')
        .expect(302)
        .end(async function(err, res) {
          if (err) return done(err)
          const order = await db.Order.findByPk(1, {})
          const payment = await db.Payment.findByPk(1, {})
          expect(order.payment_status).to.be.equal('1')
          expect(payment.payment_status).to.be.equal('1')
          done()
        })
    })

    after(async function() {
      await db.Payment.destroy({ where: {}, truncate: true })
      await db.Order.destroy({ where: {}, truncate: true })
    })
  })

  describe('POST /spgateway/callback 交易失敗', () => {
    before(async function() {
      await db.Payment.destroy({ where: {}, truncate: true })
      await db.Order.destroy({ where: {}, truncate: true })

      await db.Payment.create({ sn: '1568042833321' })
      await db.Order.create({
        sn: '1568042833321',
        checkoutPrice: 520
      })
    })

    it('交易失敗', done => {
      request(app)
        .post('/api/spgateway/callback')
        .send({
          TradeInfo:
            '1106509c93109a3ad88be5960eb5f92aead6a80bad43c2ef7ee2b4db102ee540c19c16fb8d5f6e60ad6cbf4c3161d9a62da0e686f4c3233d777729a101c6e7096d716ce8959d6102424f81e171e3e58175808d6eb07e1bda021e17f723837d8aeb6e00624a02e382ffd4cb74ae87c5de512e040db37c3384a00f2aaa61a6a46d61ee42d2b3b59cc174c2e3b74ef767fa7d760643eb17b0f39821e093e3c010bf5e25c89c1e83a9e287d3f86545a081f4fa93090d07c1e584e4ce1cb88c101e51603c5fdfae86a93d8935d33fcb7ad939f39d85098e87f9f166eea4202c2616899505b6cc63da474854eeb5daad89f3504ea7373380d6a6a22b6b47cdc8d5beef0c4430bcf8fc527adaf13be148aa3b53a804964a20ab6026a05982e0927d163f646af6f06023b02bf176764b30dc109092aa4bbc446e1b384dc9bd509ae830c7412baa234c2ffbfd9dbe4ba43d45d48124b02f8ccc60b367ff79e77a76cdd0e120be3b30765ff454e85b65d46caa697ab9b06b57ef780af40f8690e4dc4ea0ae1f636870cc7f0835de6202f220e4af90ffa9b050dd3a497ab00123132f033029fdbc3851b239d998d6b75cf91e4037bee04ab536929916d270c0499f2314b3e3cc117f7779d8c4cb37fe664e459686a8dc7d9e737fd7120ad700e3eb6b8a3a5de738bb36fd6474898f43b99f4b00faaeecb867c7ce340e178dc9d57c63899188'
        })
        .set('Accept', 'application/json')
        .expect(302)
        .end(async function(err, res) {
          if (err) return done(err)
          const order = await db.Order.findByPk(1, {})
          const payment = await db.Payment.findByPk(1, {})
          expect(order.payment_status).to.be.equal(null)
          expect(payment.payment_status).to.be.equal('2')
          done()
        })
    })

    after(async function() {
      await db.Payment.destroy({ where: {}, truncate: true })
      await db.Order.destroy({ where: {}, truncate: true })
    })
  })

  after(async () => {
    stubForTest.stubSession.restore()
  })
})
