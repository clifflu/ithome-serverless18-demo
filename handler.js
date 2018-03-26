const child_process = require('child_process')

function hdlr_check(evt, ctx, cb) {
  function exec_cb(err, stdout, stderr) {
    let output = JSON.parse(stdout)
    console.log(output)
    cb(null, output.time.total)
  }

  child_process.exec(
    `curl -sLm8 -w "@curl-format.txt" -o /dev/null ${process.env.uri}`, exec_cb
  )
}

module.exports = {
  hdlr_check,
}


