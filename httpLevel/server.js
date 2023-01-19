const http = require('http');

const todos = [
    {id:1, text:'TodoOne'},
    {id:2, text:'TodoTwo'},
    {id:3, text:'TodoThree'},
]

const server = http.createServer((req,res) => {

    //const {headers, url, method} = req;
    //console.log(headers, url, method);

    //res.setHeader('Content-Type', 'text/html');
    //res.setHeader('X-Powered-By', 'Node.js')
    //res.write('<h1>Hello!</h1>');
    //res.write('<h2>Hello!</h2>');
    //res.end();

    
    const {method, url} = req
    let body = []

    req.on('data', chunk => {
        body.push(chunk);
    }).on('end',() =>{
        body = Buffer.concat(body).toString();
        console.log(body);

        let status = 404;
        const response = {
            success:false,
            data:null
        }

        if (method === 'GET' && url === '/todos'){
            status = 200,
            response.success = true,
            response.data = todos;
            response.error = null
        } else if (method === 'POST' && url ==='/todos'){
            const {id, text} = JSON.parse(body);

            if(!id || !text){
                status = 400;
                response.error = "Please add id and text"

            }else {
                todos.push({id , text});
                status = 201;
                response.success = true;
                response.data = todos
            }
        }

        res.statusCode = status;
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('X-Powered-By', 'Node.js');
        res.setHeader('Set-Cookie', "mycookiess=test","HttpOnly=true");
       
   
        console.log(req.headers.authorization);
        console.log(req.headers.cookie);

        res.end(JSON.stringify(response));



    });

   
});

const PORT = 5000;

server.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})

