'use strict'

const fs = require('fs')
const Express = require('express')
const isbot = require('isbot')

Express()
  .set('view engine', 'pug')
  .use(require('helmet')())
  .use(Express.static('../public-dir'))
  
  .get('/', async (req, res) => {
    let ua = req.get('user-agent')
    
    if ( isbot(ua) ) {
      res.end('404: do you like hentai?')
      return
    }
    
    if ( req.query.f !== undefined ) {
      try {
        res.download(`../public-dir/${req.query.f}`)
        console.log(`[ # ] ${req.query.f}`)
      } catch {
        res.end('404: do you like hentai?')
      }
      
      return
    }
    
    let data = await fs.readdirSync('../public-dir').map(x => {
      let stats = fs.statSync('../public-dir/' + x)
      let sizes = parseFloat((stats.size / (1024 * 1024)).toString()).toFixed(2)
      
      return {
        name: x,
        size: `${sizes}MB`
      }
    })
    
    res.render('index', {
      data
    })
  })
  
  .all('*', (req, res) => {
    res.end('404: do you like hentai?')
  })
  
  .listen(8910, () => console.log('[ # ] Port 8910'))