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

router.get('/:token', function (ctx, next) {
    const token = ctx.params.token;
    console.log('url: ' + ctx.url + '\r\n' + 'token: ' + token);
    if(token == 'x2nzp6hw'){
        rumCommand('sh', ['./shell/git_integration.sh'], txt => {
            console.log(txt)
            });
        return ctx.render('webhook', {
            title: 'webhook',
            message: 'request accepted'
        });
    }
    ctx.body = 'coming soon';
});


module.exports = router;
