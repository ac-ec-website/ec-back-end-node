'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Products', [{
      name: '【草本養護】癢癢退散洗毛精-汪汪專用 500ml',
      image: 'https://shoplineimg.com/55dbc8f4e36c8e492800000f/5cbd56f2754a4d0032420105/400x.webp?source_format=png',
      description: "針對狗狗細緻肌膚打造溫和草本防護調理配方，舒緩皮膚敏感、幫助調節肌膚皮脂分泌。",
      stock_quantity: 50,
      cost_price: 250,
      origin_price: 580,
      sell_price: 460,
      product_status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: '【草本養護】癢癢退散洗毛精-汪汪專用 500ml',
      image: 'https://shoplineimg.com/55dbc8f4e36c8e492800000f/5cbd56f2754a4d0032420105/400x.webp?source_format=png',
      description: "針對狗狗細緻肌膚打造溫和草本防護調理配方，舒緩皮膚敏感、幫助調節肌膚皮脂分泌。",
      stock_quantity: 50,
      cost_price: 250,
      origin_price: 580,
      sell_price: 460,
      product_status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: '【草本養護】癢癢退散洗毛精-汪汪專用 500ml',
      image: 'https://shoplineimg.com/55dbc8f4e36c8e492800000f/5cbd56f2754a4d0032420105/400x.webp?source_format=png',
      description: "針對狗狗細緻肌膚打造溫和草本防護調理配方，舒緩皮膚敏感、幫助調節肌膚皮脂分泌。",
      stock_quantity: 50,
      cost_price: 250,
      origin_price: 580,
      sell_price: 460,
      product_status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: '【草本養護】癢癢退散洗毛精-汪汪專用 500ml',
      image: 'https://shoplineimg.com/55dbc8f4e36c8e492800000f/5cbd56f2754a4d0032420105/400x.webp?source_format=png',
      description: "針對狗狗細緻肌膚打造溫和草本防護調理配方，舒緩皮膚敏感、幫助調節肌膚皮脂分泌。",
      stock_quantity: 50,
      cost_price: 250,
      origin_price: 580,
      sell_price: 460,
      product_status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: '【草本養護】癢癢退散洗毛精-汪汪專用 500ml',
      image: 'https://shoplineimg.com/55dbc8f4e36c8e492800000f/5cbd56f2754a4d0032420105/400x.webp?source_format=png',
      description: "針對狗狗細緻肌膚打造溫和草本防護調理配方，舒緩皮膚敏感、幫助調節肌膚皮脂分泌。",
      stock_quantity: 50,
      cost_price: 250,
      origin_price: 580,
      sell_price: 460,
      product_status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: '【草本養護】癢癢退散洗毛精-汪汪專用 500ml',
      image: 'https://shoplineimg.com/55dbc8f4e36c8e492800000f/5cbd56f2754a4d0032420105/400x.webp?source_format=png',
      description: "針對狗狗細緻肌膚打造溫和草本防護調理配方，舒緩皮膚敏感、幫助調節肌膚皮脂分泌。",
      stock_quantity: 50,
      cost_price: 250,
      origin_price: 580,
      sell_price: 460,
      product_status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  }
};