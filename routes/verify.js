var http = require('http');
var crypto = require('crypto');

var server = http.createServer();

server.on('request',function (req, res){
          res.writeHead(200, {'Content-Type': 'text/plain'});

          var signature = require('url').parse(req.url,true).query.signature
          var timestamp = require('url').parse(req.url,true).query.timestamp
          var echostr = require('url').parse(req.url,true).query.echostr
          var nonce = require('url').parse(req.url,true).query.nonce
          var token = 'k3h#7*!hga3Bv<&wP8=R';
          var tmpArr = Array(token, timestamp, nonce).sort().join("");
          var sha1 = crypto.createHash('sha1');
          sha1.update(tmpArr);
          tmpArr = sha1.digest('hex');
          if(tmpArr == signature){
                  console.log('signature: '+signature);
                  console.log('timestamp: '+timestamp);
                  console.log('nonce: ' +nonce);
                  console.log('echostr: '+echostr);
                  res.end(echostr);
            }else{
                  var mydate = new Date();
                  console.log(mydate.toLocalString()+', incorrect request');
                  res.end('incorrect request, please try again');
            }

});

const hostname = '127.0.0.1';
const port = 8088;

server.listen(port,hostname, ()=>{
        console.log('server running on http://'+hostname+':'+port); 
    });

/************************** */

const router = require('koa-router')();
const crypto = require('crypto');

router.prefix('/verify');

router.get('/', function (ctx, next) {
    ctx.body = 'this is a users response!';
});


module.exports = router;