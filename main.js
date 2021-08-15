const FileSystem = require('fs');
const path = require('path');
const http = require('http');

const server = http.createServer((req, res)=>{
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)
    
    const ext = path.extname(filePath);
    let contentType = 'text/html';

    switch (ext) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        default:
            contentType = 'text/html';
            
    }

    if(!ext){
        filePath += '.html';
    }
    

    FileSystem.readFile(filePath, (err, content) => {
        if(err){
            FileSystem.readFile(path.join(__dirname, 'public', 'error.html'), (err, data)=>{
                if(err){
                    res.writeHead(500)
                    res.end('gg');
                }else{
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    })
                    res.end(data)
                    console.log('ACHTUNG SCHWEIN WIEDER VERDAMMTER FEHLER', err);
                }
            })
            
        } else{
            res.writeHead(200, {
                'Content-Type': contentType
            })
            res.end(content);
        }
    })
})

server.listen(5000, ()=>{
    console.log('server start');
})