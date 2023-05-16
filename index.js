const fs = require('fs');
const http = require('http');
const url = require('url');

const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplates');

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

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8');
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  'utf-8'
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

const slugs = dataObject.map((el) => slugify(el.productName));
console.log(slugs);

console.log(slugify('Fresh Avocados', { lower: true }));

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const cardsHtml = dataObject
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    //   console.log(cardsHtml);
    res.end(output);
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    const product = dataObject[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end('<h1>Page Not Found!</h1>');
  }
  //   res.end('Hello from the server!');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on port 8000');
});

// =========SERVER==============
