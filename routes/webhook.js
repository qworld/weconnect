//for security, webhook should not be deployed on 80 and 443 port, please set 6364 port as default

const router = require('koa-router')();
const { exec } = require('child_process');

router.prefix('/integration');

const exeCmd = (command = '') =>{
    if(!command){
        return false;
    }
    // 
    const options = {
        encoding: 'utf8',
        timeout: 0,
        maxBuffer: 200 * 1024,
        killSignal: 'SIGTERM',
        cwd: null,
        env: null
    }
    exec(command, options, (error, stdout, stderr) => {
        if(error){
            console.error(`exec error: ${error}`);
            return false;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);       
    })
}

//execute git command for code integration
const git_integrate = (ctx) => {
    const token = ctx.params.token;
    console.log('url: ' + ctx.url + '\r\n' + 'token: ' + token);
    //check url parameter
    if(token == 'x2nzp6hw'){
        let cmd = "cd /var/www/weconnect/ "
                + " && git clean -f "
                + " && git pull bitbucket master "
                + " && yarn install ";
        //execute command
        exeCmd(cmd);
        //display message 
        return ctx.render('webhook', {
            title: 'webhook',
            message: 'request accepted'
        });
    }
    ctx.body = 'coming soon';
}

//do integration by GET request
router.get('/:token', function (ctx, next) {
    git_integrate(ctx);
});

//do integration by POST request
router.post('/:token', function (ctx, next) {
    git_integrate(ctx);
});

module.exports = router;
