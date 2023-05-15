const fs = require('fs');
const http = require('http');
const url = require('url');

// ============FILES=============
// Blocking, sync way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);
// const textOut = `This is what i know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt',textOut);
// console.log('File Written');

// Non-Blocking, async way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//   fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data2) => {
//     console.log(data2);
//     fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//       console.log(data3);

//       fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
//         console.log('Your file has been written');
//       });
//     });
//   });
//   // console.log(data);
// });
// console.log('Will read file');
// ============FILES=============

// =========SERVER==============

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === '/' || pathName === '/overview') {
    res.end('This is overview');
  } else if (pathName === '/product') {
    res.end('This is product');
  }
  else {
      res.writeHead(404, {
          'Content-type':'text/html'
      });
    res.end('<h1>Page Not Found!</h1>');
    }
//   res.end('Hello from the server!');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});

// =========SERVER==============
