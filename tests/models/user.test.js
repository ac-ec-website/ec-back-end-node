const chai = require('chai')
chai.use(require('sinon-chai'))
const { expect } = require('chai')
const db = require('../../models')
const UserModel = require('../../models/user')

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers')

describe('# User Model', () => {
  const User = UserModel(sequelize, dataTypes)
  const user = new User()

  checkModelName(User)('User')

  context('Properties', () => {
    ;['name', 'email', 'password', 'address', 'role'].forEach(checkPropertyExists(user))
  })

  context('Associations', () => {
    const Order = 'Order'

    before(() => {
      User.associate({ Order })
    })

    it('defined a hasMany association with order', () => {
      expect(User.hasMany).to.have.been.calledWith(Order)
    })
  })

  describe('CRUD', () => {
    let data = null

    it('create', done => {
      db.User.create({}).then(user => {
        data = user
        done()
      })
    })
    it('read', done => {
      db.User.findByPk(data.id).then(user => {
        expect(data.id).to.be.equal(user.id)
        done()
      })
    })
    it('update', done => {
      db.User.update({}, { where: { id: data.id } }).then(() => {
        db.User.findByPk(data.id).then(user => {
          expect(data.updatedAt).to.be.not.equal(user.updatedAt)
          done()
        })
      })
    })
    it('delete', done => {
      db.User.destroy({ where: { id: data.id } }).then(() => {
        db.User.findByPk(data.id).then(user => {
          expect(user).to.be.equal(null)
          done()
        })
      })
    })
  })
})
