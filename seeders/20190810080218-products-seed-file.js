'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Products',
      [
        {
          name: '【草本養護】癢癢退散洗毛精-汪汪專用 500ml',
          image: 'https://storage.googleapis.com/gcp-shop-image/1.png',
          description: '針對狗狗細緻肌膚打造溫和草本防護調理配方，舒緩皮膚敏感、幫助調節肌膚皮脂分泌。',
          stock_quantity: 30,
          cost_price: 250,
          origin_price: 580,
          sell_price: 460,
          product_status: true,
          CategoryId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          name: '【草本養護】沁檸蘭草防蚤洗毛精-汪汪專用 500ml',
          image: 'https://storage.googleapis.com/gcp-shop-image/2.png',
          description: '薰衣草、甜橙精油能延緩出油、調理皮脂分泌，洗完清爽蓬鬆不油膩。',
          stock_quantity: 35,
          cost_price: 250,
          origin_price: 650,
          sell_price: 520,
          product_status: true,
          CategoryId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          name: '【口腔對策】得寸淨齒舒口水',
          image: 'https://storage.googleapis.com/gcp-shop-image/3.png',
          description:
            '犬貓專用的食品級漱口水配方，獨特添加南非國寶茶萃取、口感溫和，能深入牙縫牙齦等死角，有效去除毛孩口腔異味，長效維持清新好口氣。',
          stock_quantity: 50,
          cost_price: 250,
          origin_price: 580,
          sell_price: 460,
          product_status: true,
          CategoryId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          name: '【植淨日常】草本速淨潔膚水',
          image: 'https://storage.googleapis.com/gcp-shop-image/4.png',
          description: '草本潔淨配方，可迅速清除毛孩身上的髒汙與異味，一次達到清潔、消臭、爽膚的功效。',
          stock_quantity: 42,
          cost_price: 250,
          origin_price: 430,
          sell_price: 349,
          product_status: true,
          CategoryId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          name: '【口腔對策】喵口回春潔牙凝膠',
          image: 'https://storage.googleapis.com/gcp-shop-image/5.png',
          description:
            '絕佳適口性讓寶貝更不排斥刷牙，並有效去除口腔異味，長期使用可幫助清除牙齒汙垢，保持口腔健康環境。獨特添加排毛植物纖維1500mg，幫助維持消化道機能。',
          stock_quantity: 8,
          cost_price: 250,
          origin_price: 390,
          sell_price: 320,
          product_status: true,
          CategoryId: 2,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        },
        {
          name: '【口腔對策】狗齒清新潔牙凝膠',
          image: 'https://storage.googleapis.com/gcp-shop-image/6.png',
          description: '專為狗狗設計的牛肉味潔牙凝膠，全成分可食用的安心配方。',
          stock_quantity: 50,
          cost_price: 250,
          origin_price: 390,
          sell_price: 320,
          product_status: true,
          CategoryId: 1,
          createdAt: '2019-9-20T13:00:00',
          updatedAt: '2019-9-20T13:00:00'
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {})
  }
}
