const request = require('request')

function hdlr_check(evt, ctx, cb) {
  function request_callback(err, response, body) {
    if (!err && -1 === body.indexOf(process.env.expect)) {
      err = new Error('Expect not found in body')
    }
    
    cb(err, 'done')
  }

  request.get(process.env['uri'], request_callback)
}

module.exports = {
  hdlr_check,
}
