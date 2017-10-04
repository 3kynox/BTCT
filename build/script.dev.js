process.env.NODE_ENV = 'development'

const { StringDecoder } = require('string_decoder')

require('colors')

var
  path = require('path'),
  express = require('express'),
  webpack = require('webpack'),
  bodyParser = require('body-parser'),
  fs = require('fs'),
  spawn = require('child_process').spawn,
  isPi = require('detect-rpi'),
  os = osDetection(),
  gbStart,
  gbStatus = false,
  env = require('./env-utils'),
  config = require('../config'),
  opn = require('opn'),
  proxyMiddleware = require('http-proxy-middleware'),
  webpackConfig = require('./webpack.dev.conf'),
  app = express(),
  port = process.env.PORT || config.dev.port,
  uri = 'http://localhost:' + port

function osDetection() {
    if (isPi()) {
        return './gunthy-arm'
    } else if (process.platform == 'darwin') {
        return './gunthy-macos'
    } else {
        return './gunthy-linx64'
    }
}

app.use(bodyParser.json())

app.get('/gbstart', function (req, res) {
    if (gbStatus)
        return

    var isWin = /^win/.test(process.platform)
    gbStart = spawn(isWin ? 'cmd' : 'sh', [isWin ? '/c' : '-c', isWin ? 'gunthy.exe' : os])
    gbStatus = true

    console.log('gunbot have been started')

    gbStart.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
    })

    gbStart.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`)
    })

    gbStart.on('close', (code) => {
        console.log(`gunbot have been stopped`)
    })
})

app.get('/gbstop', function (req, res) {
    gbStatus = false
    var kill  = require('tree-kill')
    kill(gbStart.pid)
})

app.put('/gbstatus', function (req, res) {
    if (!gbStatus) {
        res.send(false)
    } else {
        res.send(true)
    }
})

app.get('/getConfig', function (req, res) {
    var json = fs.readFileSync('../server/config.js')
    var decoder = new StringDecoder('utf8')

    json = decoder.write(json)
    json = JSON.parse(json)

    res.send(json)
})

app.get('/listener', function (req, res) {
    console.log(req.params)
    res.sendFile(__dirname + '../server/public/listener.html')
})

app.get('/listener/gethost', function( req, res) {
    var json = fs.readFileSync('../server/config.js', {})
    var decoder = new StringDecoder('utf8')

    json = decoder.write(json)
    json = JSON.parse(json)

    res.send('var config = ' + JSON.stringify(json.ws) +';')
})

app.get('/listener/:exchange/:pair', function (req, res) {
    console.log(req.params)
    var web = fs.readFileSync('../server/public/listener.html', {})
    var decoder = new StringDecoder('utf8')

    web = decoder.write(web)

    web = web.replace(/exchange-placeholder/g, req.params.exchange).replace(/pair-placeholder/g, req.params.pair)
    res.send(web);
})

app.get('/get_pairs/:exchange', function (req, res) {
    console.log(req.params)

    var json = fs.readFileSync('../server/config.js', {})
    var decoder = new StringDecoder('utf8')

    json = decoder.write(json)
    json = JSON.parse(json)

    var pairs = Object.keys(json.pairs[req.params.exchange])

    pairs = JSON.stringify(pairs)

    console.log(pairs)

    res.send(pairs)
})

app.post('/updateconfig', function (req, res) {

    var json = req.body

    for (var k in json.optionals.toOverride) {
        if (json.optionals.toOverride.hasOwnProperty(k)) {

            console.log(k)

            if(['BUY_ENABLED', 'DOUBLE_UP', 'PANIC_SELL', 'VERBOSE', 'WATCH_MODE', 'debug'].indexOf(k) >= 0) {

                // If it is a number
                if(!isNaN(json.optionals.toOverride[k])) {
                    json.optionals.toOverride[k] = json.optionals.toOverride[k] > 0.5
                } else if(json.optionals.toOverride[k] === "true") {
                    json.optionals.toOverride[k] = true
                } else if(json.optionals.toOverride[k] === "false") {
                    json.optionals.toOverride[k] = false
                }


            } else {
                json.optionals.toOverride[k] = parseFloat(json.optionals.toOverride[k])
            }

        }
    }

    for (k in json.pairs) {
        if (json.pairs.hasOwnProperty(k)) {

            for(var k2 in json.pairs[k]) {
                if (json.pairs[k].hasOwnProperty(k2)) {

                    for(var k3 in json.pairs[k][k2].override) {

                        if (json.pairs[k][k2].override.hasOwnProperty(k3)) {
                            if(['BUY_ENABLED', 'DOUBLE_UP', 'PANIC_SELL', 'VERBOSE', 'WATCH_MODE', 'debug'].indexOf(k3) >= 0) {
                                json.pairs[k][k2].override[k3] = json.pairs[k][k2].override[k3] > 0.5

                                if(!isNaN(json.pairs[k][k2].override[k3])) {
                                    json.pairs[k][k2].override[k3] = json.pairs[k][k2].override[k3] > 0.5
                                } else if(json.pairs[k][k2].override[k3] === "true") {
                                    json.pairs[k][k2].override[k3] = true
                                } else if(json.pairs[k][k2].override[k3] === "false") {
                                    json.pairs[k][k2].override[k3] = false
                                }

                            } else {
                                json.pairs[k][k2].override[k3] = parseFloat(json.pairs[k][k2].override[k3])
                            }
                        }
                    }
                }
            }
        }
    }

    fs.writeFileSync('../server/config.js', JSON.stringify(json, null, "\t"), 'utf-8', function(err) {
        if (err) throw err
        console.log('Done!')
    });

    res.send("{}")
})

console.log(' Starting dev server with "' + (process.argv[2] || env.platform.theme).bold + '" theme...')
console.log(' Will listen at ' + uri.bold)
if (config.dev.openBrowser) {
  console.log(' Browser will open when build is ready.\n')
}

var compiler = webpack(webpackConfig)

// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: function () {}
})

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy requests like API. See /config/index.js -> dev.proxyTable
// https://github.com/chimurai/http-proxy-middleware
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticsPath = path.posix.join(webpackConfig.output.publicPath, 'statics/')
app.use(staticsPath, express.static('./client/src/statics'))

// try to serve Cordova statics for Play App
app.use(express.static(env.platform.cordovaAssets))

app.use(express.static('../server/public'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    process.exit(1)
  }

  // open browser if set so in /config/index.js
  if (config.dev.openBrowser) {
    devMiddleware.waitUntilValid(function () {
      opn(uri)
    })
  }
})
