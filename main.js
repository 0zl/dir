'use strict'

const fs = require('fs')
const Express = require('express')

Express()
  .set('view engine', 'pug')
  .use(require('helmet')())
  .use(Express.static('../public-dir'))
  
  .get('/', async (req, res) => {
    let data = await fs.readdirSync('../public-dir')
    
    res.render('index', {
      data
    })
  })
  
  .listen(8910, () => console.log('[ # ] Port 8910'))