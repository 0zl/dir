'use strict'

const Express = require('express')

Express()
  .set('view engine', 'pug')
  .use(require('helmet')())
  
  .get('/', async (req, res) => {
    res.end('Zuki Directory')
  })
  
  .listen(8910, () => console.log('[ # ] Port 8910'))