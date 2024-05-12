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

});

serverName.listen(3000, "localhost", () =>{

});
