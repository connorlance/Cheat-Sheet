//********* TABLE OF CONTENTS  ***********//
Export Module;
Import Module;

Read file;
Write file;

Create File;
Create Directory;

Remove Directory;
Delete file;

Read stream;
Write Stream;
Piping;

Creating server;
Sending HTML file;
Routing;
Redirect;

Node.js html,css,js file serving template;

express file serving;
express redirect;





/* MODULES */
//export multiple from a file
module.exports = { name, name2, name3 };

//import file
const name = require("./fileName");
//import specific from file
const { name, name2 } = require("./fileName");

/* File System*/
const fs = require("fs");

//reading files
fs.readFile("./fileName", (err, data) => {
  if (err) {
    console.log(err);
  }
  console.log(data);
});

//writing files
fs.writeFile("./fileName", "Hello world!", () => {
  console.log("File was written");
});

//** If the file name does not exist, the file will be created */
fs.writeFile("./nonExistentFileName", "Hello world!", () => {
  console.log("File was created");
});

//directories
if (!fs.existsSync("./directoryName")) {
  fs.mkdir("./directoryName", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Directory created");
  });
} else {
  fs.rmdir("./directoryName", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Directory removed");
  });
}

//deleting files
if (fs.existsSync("./fileName")) {
  fs.unlink("./fileName", (err) => {
    if (err) {
      console.log(err);
    }
    console.log("File deleted");
  });
}

//Streams
const readStream = fs.createReadStream("./fileName", { encoding: "utf8" });

readStream.on("data", (chunk) => {
  console.log("------NEW CHUNK------");
  console.log(chunk);
});

const writeStream = fs.createWriteStream("./fileName");

writeStream.on("data", (chunk) => {
  writeStream.write("-----NEW CHUNK-----");
  writeStream.write(chunk);
});

//**Piping. readStream data piped directly into writeStream */
readStream.pipe(writeStream);

/* Creating server */

const http = require('http');

const serverName = http.createServer((req, res) =>{
  console.log(req.url, req.method);
});

serverName.listen(3000, "localhost", () =>{

});

//sending html file
const fs = require('fs');
res.setHeader('Content-Type', "text/html");

fs.readFile('./fileName.html', (err, data) =>{
  if(err){
    console.log(err);
  }else {
    res.end(data);
  }
});

//routing
let path ='./folderName/';

switch(req.url){
  case '/':
    path += 'index.html'
    res.statusCode = 200;
    break;
  default:
    path += '404.html';
    res.statusCode = 404;
    break;
}

//redirect
case '/fileName';
res.statusCode = 301;
res.setheader('Location', '/fileName');
res.end();

//template for node.js html, css, js file serving
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);

  let filePath = "./Client/";
  switch (req.url) {
    case "/":
      filePath += "index.html";
      res.statusCode = 200;
      break;
    case "/styles.css":
      filePath += "/styles.css";
      res.statusCode = 200;
      break;
    case "/script.js":
      filePath += "/script.js";
      res.statusCode = 200;
      break;
    default:
      filePath += "404.html";
      res.statusCode = 404;
      break;
  }

  const contentType = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
  };

  const extension = path.extname(filePath);
  const contentTypeHeader = contentType[extension] || "text/html";
  res.setHeader("Content-Type", contentTypeHeader);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("listening for requests on port 3000");
});

//express

const express = require('express');

const app = express();

app.listen(3000);

/**can be done this way by setting the root path to project directory*/
app.get('/', (req, res) =>{
  res.sendFile('./fileName', { root: __dirname });
});
/**or can be done using path module */
const path = require('path');

app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname, './fileName'));
});

//express redirect
app.get('./fileName', (req, res) =>{
  res.redirect('./fileName');
});

//express 404 page
app.use((req, res) =>{
  /**this way */
  res.sendFile('./404.html', { root: __dirname });
  /**or this way */
  res.sendFile(path.join(__dirname, './404.html'));
});


