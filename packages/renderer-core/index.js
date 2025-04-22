'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/renderer-core.cjs.prod.js')
} else {
  module.exports = require('./dist/renderer-core.cjs.js')
}
