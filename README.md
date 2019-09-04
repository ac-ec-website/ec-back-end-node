<p align="center">
  <img src="https://github.com/ac-ec-website/ec-back-end-node/blob/master/ec-back-end-node-logo.png" alt="ec-back-end-node-logo"/>
</p>

<p align="center">
  <a href="https://travis-ci.org/ac-ec-website/ec-back-end-node"><img src="https://travis-ci.org/ac-ec-website/ec-back-end-node.svg?branch=master" alt="Build Status"></a>
  <a href="https://coveralls.io/github/ac-ec-website/ec-back-end-node"><img src="https://coveralls.io/repos/github/ac-ec-website/ec-back-end-node/badge.svg" alt="Coverage Status"></a>
</p>

# EC-Back-End-Node

EC-Back-End-Node 是一個使用 Node.js + Express + MySQL/PostgreSQL 建立的電子商務後端專案，部署於 Heroku，以 RESTFul API 滿足電商網站不同資料的互動需求，搭配 [EC-Front-End-Vue](https://github.com/ac-ec-website/ec-front-end-vue) 前端專案，打造一個全方位的電商網站。

## 專案緣起

專案緣起於 Alpha Camp 畢業專題發想，由團隊共同決議要選擇「電商平台」為主題，打造一個前後端分離的作品，期望透過技術解決傳統店家要拓展線上通路進入門檻過高的問題，包含網站開發、金流串接...等等。

因此，我們建立一個可以讓店家輕鬆開店、提供消費者各種優惠，也可以管理庫存的電商網站，如同常見的前台購物功能、後台上架管理功能等等。

專案核心價值：

1. 對消費者的價值：提供一個產品資訊清楚，購物/付費流程簡單，體驗良好的網路購物平台。

2. 對店家的價值：大幅減低網路開店的成本，輕鬆轉型電商，省去自行開發、另找金流物流服務、行銷等事情，讓商家專注在本業商品的研發與生產。

## Features - 專案功能

- 消費者 CRUD - 商品瀏覽、加入購物車、創建訂單、結帳付款、訂單瀏覽
- 管理員 CRUD - 商品管理、商品分類管理、訂單管理、優惠券管理、特價活動管理、用戶權限管理
- 整合 mocha / chai / sinon / supertest 完成單元測試（Model / Request）
- 整合 nyc / coveralls 檢視測試結果覆蓋率
- 整合 Travis CI 實踐自動化測試（CI）
- 整合 Heroku 實踐自動化部屬（CD）
- 串接第三方藍新金流，快速接入多種支付方式
- 透過 cors 實作前後端分離跨域 session，訪客不需要登入即可完成購物
- 採用 JSON Web Tokens 實作跨域認證
- 採用 multer 對接前後端檔案程式
- 整合 imgur API，實作上傳圖片功能
- 採用 bcrypt 處理使用者密碼
- 使用 dotenv 設定環境變數

## DB Structure - 資料庫架構規劃

- 關聯式資料庫（素材準備中）

## API Reference - 格式範例

- [所有商品](https://ec-website-api.herokuapp.com/api/products)
- [單一商品](https://ec-website-api.herokuapp.com/api/products/1)
- [需登入，才能取得後台商品資訊](https://ec-website-api.herokuapp.com/api/admin/products)

## Environment SetUp - 環境建置

1. [Node.js](https://nodejs.org/en/)
2. [MySQL](https://www.mysql.com/) / [PostgreSQL](https://www.postgresql.org/)

## Installing - 專案安裝流程

1. 打開你的 terminal，Clone 此專案至本機電腦

```
git clone https://github.com/ac-ec-website/ec-back-end-node
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd ec-back-end-node
```

3. 安裝 npm 套件，下載專案相依套件

```
在 Terminal 輸入 npm install 指令
```

4. 環境變數設定

將 .env.example 檔案名稱修改為 .env，並填入相對應的值

```
//.env.example --> .env
GMAIL_ACCOUNT=
GMAIL_PASSWORD=
URL=你部屬這個專案的網址
MERCHANT_ID=你的藍新金流商店 ID
HASH_KEY=你的藍新金流商店 HASH_KEY
HASH_IV=你的藍新金流商店 HASH_IV
JWT_SECRET=
IMGUR_CLIENT_ID=
```

5. 資料庫設定

新建兩個資料庫名稱為：ec_website_api、ec_website_api_test，並更新 /config/config.json 的資料庫連線設定，最後執行 migration 建立

```
npx sequelize db:migrate
```

6. 建立種子檔案

```
npx sequelize db:seed:all
```

7. 測試

本專案使用 Mocha 做單元測試，Sinon.JS 模擬登入，Istanbul/nyc 計算程式覆蓋率。

```
npm run test
```

8. 啟動應用程式，執行 app.js 檔案

```
在 Terminal 執行 npm run dev
```

現在，你可開啟任一瀏覽器瀏覽器輸入 [http://localhost:3000](http://localhost:3000) 開始查看囉！

## Contributor - 專案開發人員

[Pierce Shih](https://github.com/pierceshih15)

[Zhen Yi](https://github.com/asd8116)

[Ginger 敬杰](https://github.com/Lianginger)
