'use strict'

const fs = require('fs')
const Express = require('express')

Express()
  .set('view engine', 'pug')
  .use(require('helmet')())
  .use(Express.static('../public-dir'))
  
  .get('/', async (req, res) => {
    if ( req.query.f !== undefined ) {
      try {
        res.download(`../public-dir/${req.query.f}`)
        console.log(`[ # ] ${req.query.f}`)
      } catch {
        res.end('404: do you like hentai?')
      }
      
      return
    }
    
    let data = await fs.readdirSync('../public-dir').map(async x => {
      let stats = await fs.statSync('../public-dir/' + x)
      let sizes = stats.size / (1024 * 1024)
      
      return {
        name: x,
        size: `${sizes}M`
      }
    })
    
    console.log(data)
    
    res.render('index', {
      data
    })
  })
  
  .all('*', (req, res) => {
    res.end('404: do you like hentai?')
  })
  
  .listen(8910, () => console.log('[ # ] Port 8910'))