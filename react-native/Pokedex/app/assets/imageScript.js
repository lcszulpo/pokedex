const testFolder = './images/';
const fs = require('fs');

// fs.readdir(testFolder, (err, files) => {
//   files.forEach(file => {
//     const dot = file.indexOf('.');
//     const title = file.substring(0, dot).replace('_', '');
//
//     console.log(`import ${title} from './images/${file}';`);
//   });
// });

fs.readdir(testFolder, (err, files) => {
  let images = 'const images = {';

  files.forEach(file => {
    const dot = file.indexOf('.');
    const title = file.substring(0, dot).replace('_', '');
    images += `\n${title},`
  });

  images += '\n}';

  console.log(images);
});
