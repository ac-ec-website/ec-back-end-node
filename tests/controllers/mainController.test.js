/* eslint-env mocha */
const request = require('supertest')
const { expect } = require('chai')

const app = require('../../app')

describe('#Main Controller', () => {
  describe('GET / 首頁回應', () => {
    before(async function() {
      // 在所有測試開始前會執行的程式碼區塊
    })

    it('API 首頁有回應', done => {
      request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect(200)
        .end(function(err, res) {
          done()
        })
    })

    after(async function() {
      // 在所有測試結束後會執行的程式碼區塊
    })
  })

  describe('GET /redirect-back 反向重新導向', () => {
    before(async function() {
      // 在所有測試開始前會執行的程式碼區塊
    })

    it('redirect-back 反向重新導向', done => {
      request(app)
        .get('/redirect-back')
        .set('Accept', 'application/json')
        .expect(302)
        .end(function(err, res) {
          done()
        })
    })

    after(async function() {
      // 在所有測試結束後會執行的程式碼區塊
    })
  })
})
