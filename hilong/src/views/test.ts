const http = require('http');
const server = http.createSerever((req: any, res: any) =>{
    res.end('ssss');
});
server.listen(8080,()=>{
    console.log('start')
})