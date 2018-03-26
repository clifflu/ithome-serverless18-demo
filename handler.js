const child_process = require('child_process')

function hdlr_check(evt, ctx, cb) {
  function exec_cb(err, stdout, stderr) {
    if (err) {
      return cb(err)
    }

    console.log({stdout, stderr})

    try {
      let output = JSON.parse(stdout)
      cb(null, output.time.total)  
    } catch(E) {
      cb(new Error('Invalid output, expecting JSON'))
    }
  }

  child_process.exec(
    `curl -sLm8 -w "@curl-format.txt" -o /dev/null ${process.env.uri}`, exec_cb
  )
}

module.exports = {
  hdlr_check,
}


