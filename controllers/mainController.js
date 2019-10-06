const mainController = {
  hello: (req, res) => {
    res.send(`
      <span>Hello! This is a E-commerce backend API. Check out our fancy </span>
      <a href="https://ac-ec-website.github.io/ec-front-end-vue/dist/#/">website.</a>
    `)
  },

  redirectBack: (req, res) => {
    res.redirect(req.headers.referer)
  }
}

module.exports = mainController
