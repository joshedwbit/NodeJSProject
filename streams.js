const fs = require('fs');

const readStream=fs.createReadStream('./docs/largedata.txt', {encoding:'utf8'});
const writeStream=fs.createWriteStream('./docs/blog4.txt');

// readStream.on('data',(chunk)=>{
//     console.log('-----New CHUNK------')
//     console.log(chunk);
//     writeStream.write('\nNEW CHUNK\n');
//     writeStream.write(chunk);
// })


// piping 
readStream.pipe(writeStream);