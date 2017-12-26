//for security, webhook should not be deployed on 80 and 443 port, please set 6364 port as default

const router = require('koa-router')();
const { spawn } = require('child_process');

router.prefix('/integration');

const rumCommand = (cmd, args, callback) => {
    const child = spawn(cmd, args)
    let response = ''
    child.stdout.on('data', buffer => response += buffer.toString())
    child.stdout.on('end', () => callback(response))
}

router.get('/', function (ctx, next) {
    ctx.body = 'coming soon'
});

router.get('/x2nzp6hw', function (ctx, next) {
    //ctx.body = 'request accepted';
    rumCommand('sh', ['./shell/git_integration.sh'], txt => {
    console.log(txt)
    });
    return ctx.render('webhook', {
        title: 'webhook',
        message: 'request accepted'
  });
  
});

module.exports = router;
