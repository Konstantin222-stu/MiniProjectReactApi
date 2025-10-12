const Router = require('express')
const router = new Router()
const fs = require('fs')
const path = require('path')

fs.readdirSync(path.join(__dirname)).forEach(file => {
  if (file !== 'index.js' && file.endsWith('Router.js')) {
    const routeName = file.replace('Router.js', '')
    const routeRouter = require(`./${file}`)
    router.use(`/${routeName}`, routeRouter)
  }
})

module.exports = router